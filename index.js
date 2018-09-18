const express = require("express");
const app = express();
const server = require("http").Server(app);
const io = require("socket.io")(server, { origins: "localhost:8080" });
const compression = require("compression"); //to compress the bundle server before response to client
const bodyParser = require("body-parser");
const queryFunction = require("./queryFunction");
const chalk = require("chalk");
const { hashPass, checkPass, passRestrictions } = require("./hashFunctions");
const cookieSession = require("cookie-session");
const { uploadS3 } = require("./s3");
const multer = require("multer");
const uidSafe = require("uid-safe");
const { s3Url } = require("./config");
const path = require("path");

let secrets;
process.env.NODE_ENV === "production"
    ? (secrets = process.env)
    : (secrets = require("./secrets.json"));

app.use(bodyParser.json());

const cookieSessionMiddleware = cookieSession({
    secret: secrets.cookieSecret,
    maxAge: 1000 * 60 * 60 * 24 * 90
});

app.use(cookieSessionMiddleware);
io.use(function(socket, next) {
    cookieSessionMiddleware(socket.request, socket.request.res, next);
});

var diskStorage = multer.diskStorage({
    destination: function(req, file, callback) {
        callback(null, __dirname + "/uploads");
    },
    filename: function(req, file, callback) {
        uidSafe(24).then(function(uid) {
            callback(null, uid + path.extname(file.originalname));
        });
    }
});

var uploader = multer({
    storage: diskStorage,
    limits: {
        fileSize: 2097152
    }
});

//PURPOSE: VULNERABILITIES
const csurf = require("csurf");
app.use(csurf()); // use after cookie/body middleware, CSRF attack prevention
app.use(function(req, res, next) {
    res.cookie("mytoken", req.csrfToken()); //responds with a cookie "mytoken" for every request done to server
    next();
});
app.use(function(req, res, next) {
    res.setHeader("x-frame-options", "DENY");
    next();
});
app.disable("x-powered-by");
//END VULNERABILITIES

app.use(compression());
app.use(express.static("./public"));

if (process.env.NODE_ENV != "production") {
    app.use(
        "/bundle.js",
        require("http-proxy-middleware")({
            target: "http://localhost:8081/"
        })
    );
} else {
    app.use("/bundle.js", (req, res) => res.sendFile(`${__dirname}/bundle.js`));
}

//////////////////////////////ROUTE RESTRICTIONS///////////////////////////
//////////////////////////////////////////////////////////////////////////
function checkIfLoggedIn(req, res, next) {
    if (!req.session.loggedIn && req.url != "/welcome") {
        res.redirect("/welcome");
    } else if (req.session.loggedIn && req.url == "/welcome") {
        res.redirect("/");
    } else {
        next();
    }
}
//////////////////////////////ROUTE RESTRICTIONS///////////////////////////
//////////////////////////////////////////////////////////////////////////

app.post("/submit-registration", (req, res) => {
    if (!req.body.password) {
        res.json({ error: true });
    } else {
        if (passRestrictions(req.body.password) == false) {
            return res.json({ weakPassword: true });
        }
        hashPass(req.body.password)
            .then(hashedPassword => {
                return queryFunction.createUser(
                    req.body.firstname,
                    req.body.lastname,
                    req.body.email,
                    hashedPassword
                );
            })
            .then(useridResponse => {
                req.session.loggedIn = useridResponse.rows[0].id; //sets cookie based on the users ID
                res.json({
                    loggedIn: true
                });
            })
            .catch(e => {
                console.log(chalk.red("CREATEUSER/REGISTER ERROR: "), e);
                res.json({
                    error: true
                });
            });
    }
});

app.post("/login-check", (req, res) => {
    if (!req.body.email || !req.body.password) {
        res.json({ blankFieldsError: true });
    } else {
        queryFunction
            .fetchPassword(req.body.email)
            .then(passwordResponse => {
                return checkPass(
                    req.body.password,
                    passwordResponse.rows[0].password
                ).then(passwordMatch => {
                    if (passwordMatch) {
                        queryFunction
                            .fetchId(req.body.email)
                            .then(fetchedId => {
                                req.session.loggedIn = fetchedId.rows[0].id; //set cookie based on fetched ID
                                res.json({
                                    loggedIn: true
                                });
                            });
                    } else {
                        console.log("MEEP MERP!", req.session);
                        res.json({
                            error: true
                        });
                    }
                });
            })
            .catch(e => {
                console.log(chalk.red("FETCH PASSWORD ERROR: "), e);
                res.json({
                    errorType: "general"
                });
            });
    }
});

app.get("/sign-out", (req, res) => {
    req.session = null;
    res.redirect("/welcome");
});

app.get("/user-data", (req, res) => {
    let id = req.session.loggedIn;
    queryFunction
        .fetchUserData(id)
        .then(userData => {
            const {
                id,
                firstname,
                lastname,
                avatar,
                user_bio
            } = userData.rows[0];
            res.json({ id, firstname, lastname, avatar, user_bio });
        })
        .catch(e => {
            console.log("GET USERDATA QUERRY ERROR: ", e);
            res.status(500).json({ error: true });
        });
});

app.post("/avatar-uploads", uploader.single("file"), uploadS3, (req, res) => {
    const avatarUrl = s3Url + req.file.filename;
    if (req.file) {
        queryFunction
            .updateAvatar(req.session.loggedIn, s3Url + req.file.filename)
            .then(() => {
                res.json({ avatar: avatarUrl });
            });
    } else {
        res.status(500).json({ errorUploadingImage: true });
    }
});

app.post("/post-bio", (req, res) => {
    queryFunction
        .postBio(req.session.loggedIn, req.body.user_bio)
        .then(() => {
            res.json({ user_bio: req.body.user_bio });
        })
        .catch(e => {
            console.log("ERROR POSTING USERBIO: ", e);
            res.status(500).json({ errorPostingUserBio: true });
        });
});

app.get("/get-other-users-data/:otherUserId", async (req, res) => {
    try {
        const otherUsersData = await queryFunction.fetchOtherUsersData(
            req.params.otherUserId
        );
        const {
            id,
            firstname,
            lastname,
            avatar,
            user_bio
        } = otherUsersData.rows[0];
        res.json({ id, firstname, lastname, avatar, user_bio });
    } catch (e) {
        console.log("ERROR FETCHING OTHER USERS DATA: ", e);
        res.status(500).json({ errorGettingOtherUserData: true });
    }
});

app.post("/friend-status", async (req, res) => {
    try {
        const friendStatus = await queryFunction.checkFriendStatus(
            req.session.loggedIn,
            req.body.otherUserId
        );
        if (friendStatus.rows[0]) {
            if (req.session.loggedIn == friendStatus.rows[0].sender_id) {
                res.json({
                    friendReqSent: true,
                    friendStatus: friendStatus.rows[0].status
                });
            } else if (
                req.session.loggedIn == friendStatus.rows[0].receiver_id
            ) {
                res.json({
                    friendReqReceived: true,
                    friendStatus: friendStatus.rows[0].status
                });
            }
        } else {
            res.json({
                friendReqSent: false,
                friendReqReceived: false,
                friendStatus: null
            });
        }
    } catch (e) {
        console.log("ERROR CHECKING FRIENDSHIP STATUS: ", e);
        res.status(500).json({ errorCheckingFriendStatus: true });
    }
});

app.post("/add-friend", async (req, res) => {
    try {
        const addFriend = await queryFunction.addFriend(
            req.session.loggedIn,
            req.body.otherUserId,
            1
        );
        res.json({ friendReqSent: true, friendStatus: 1 });
    } catch (e) {
        console.log("ERROR ADDING FRIEND QUERY: ", e);
        res.status(500).json({ errorAddingFriend: true });
    }
});

app.post("/accept-friend-req", async (req, res) => {
    try {
        const acceptFriendReq = await queryFunction.acceptFriendReq(
            req.session.loggedIn,
            req.body.otherUserId
        );
        res.json({ friendReqAccepted: true, friendStatus: 2 });
    } catch (e) {
        console.log("ERROR ACCEPTING FRIEND REQ QUERY: ", e);
        res.status(500).json({ errorAcceptingFriend: true });
    }
});

app.post("/cancel-friend-req", async (req, res) => {
    try {
        const cancelFriendReq = await queryFunction.deleteFriendRow(
            req.session.loggedIn,
            req.body.otherUserId
        );
        res.json({
            friendReqReceived: false,
            friendReqSent: false,
            friendStatus: null
        });
    } catch (e) {
        console.log("ERROR CANCELLING FRIEND REQ QUERY: ", e);
        res.status(500).json({ errorCancellingFriend: true });
    }
});

app.post("/unfriend", async (req, res) => {
    try {
        const unfriend = await queryFunction.deleteFriendRow(
            req.session.loggedIn,
            req.body.otherUserId
        );
        res.json({
            friendReqReceived: false,
            friendReqSent: false,
            friendStatus: null
        });
    } catch (e) {
        console.log("ERROR CANCELLING FRIEND REQ QUERY: ", e);
        res.status(500).json({ errorUnfriending: true });
    }
});

app.get("/fetchall-friends-wannabes", async (req, res) => {
    try {
        const allFriendsWannabes = await queryFunction.fetchFriendsWannabes(
            req.session.loggedIn
        );
        res.json({ allFriendsWannabes: allFriendsWannabes.rows });
    } catch (e) {
        console.log("ERROR FETCHING ALL FRIENDS WANNABEES: ", e);
        res.status(500).json({ errorFetchingFriendsWannabees: true });
    }
});

// app.post("/post-chat-message", async (req, res) => {
//     try {
//         console.log(req.body.message);
//         console.log(req.session.loggedIn);
//         const chatMessages = queryFunction.postChatMessage(
//             req.session.loggedIn,
//             req.body.message
//         );
//         res.json({ chatMessageSuccess: true });
//     } catch (e) {
//         console.log("ERROR POSTING CHAT MESSAGES: ", e);
//         res.status(500).json({ errorPostingChatMessage: true });
//     }
// });

//order here MATTERS
app.get("*", checkIfLoggedIn, (req, res) => {
    res.sendFile(__dirname + "/index.html");
});

//server listening- (only http requests)
server.listen(8080, function() {
    console.log("I'm listening: ");
});

//websockets listening- (order doesnt matter, listens in parallel)
let onlineUsersObj = {};
io.on("connection", function(socket) {
    if (!socket.request.session || !socket.request.session.loggedIn) {
        return socket.disconnect(true);
    }
    const loggedIn = socket.request.session.loggedIn;
    console.log(
        `socket with the id ${
            socket.id
        } and USERID ${loggedIn} is now connected`
    );

    ////////////////////////////////JOIN AND LEAVE/////////////////////////
    //create array of loggedin users
    onlineUsersObj[socket.id] = loggedIn;
    let arrayUserIds = Object.values(onlineUsersObj);

    queryFunction.getOnlineUsers(arrayUserIds).then(onlineUsers => {
        socket.emit("onlineUsersResponse", {
            onlineUsers: onlineUsers.rows
        });
    });

    let allSocketIds = arrayUserIds.filter(id => id == loggedIn);
    if (allSocketIds.length == 1) {
        queryFunction.fetchUserData(loggedIn).then(userJoined => {
            const { id, firstname, lastname, avatar } = userJoined.rows[0];
            socket.broadcast.emit("userJoined", {
                //broadcast sends to all except main user
                userJoined: { id, firstname, lastname, avatar }
            });
        });
    }

    ///////////////////////////////CHAT COMMENT/////////////////////////////

    socket.on("getChatMessages", () => {
        queryFunction
            .fetchChatDataMounted()
            .then(chatData => {
                let chatDataSorted = chatData.rows.sort(function(a, b) {
                    return a.id - b.id;
                });
                console.log("alldata sorted", chatDataSorted);
                io.sockets.emit("allChatResponse", chatDataSorted);
            })
            .catch(e => console.log("error getting chat data: ", e));
    });

    socket.on("sendChatMessage", message => {
        console.log("SEND CHAT MESSAGE REQUEST", message);
        queryFunction
            .postChatMessage(loggedIn, message)
            .then(lastIdReturned => {
                const lastId = lastIdReturned.rows[0].id;
                queryFunction.fetchLastMessage(lastId).then(lastMessage => {
                    io.sockets.emit("messageResp", lastMessage.rows[0]);
                });
            })
            .catch(e => console.log("error posting chat message to server", e));
    });

    ///////////////////////////////DISCONNECT///////////////////////////////
    socket.on("disconnect", function() {
        console.log(
            `socket with the id ${
                socket.id
            } and user id ${loggedIn} is now disconnected`
        );
        delete onlineUsersObj[socket.id];
        arrayUserIds = Object.values(onlineUsersObj);
        //create if to find out if really left before querying
        if (!arrayUserIds.includes(loggedIn)) {
            queryFunction.fetchUserData(loggedIn).then(userLeft => {
                const { id, firstname, lastname, avatar } = userLeft.rows[0];
                io.sockets.emit("userLeft", {
                    userLeft: { id, firstname, lastname, avatar }
                });
            });
        }
    });
});
