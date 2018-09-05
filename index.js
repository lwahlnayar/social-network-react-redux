const express = require("express");
const app = express();
const compression = require("compression");
const bodyParser = require("body-parser");
const queryFunction = require("./queryFunction");
const chalk = require("chalk");
const { hashPass, checkPass, passRestrictions } = require("./hashFunctions");
app.use(bodyParser.json());

//PURPOSE: VULNERABILITIES
const csurf = require("csurf");
// app.use(csurf()); // use after cookie/body middleware, CSRF attack prevention
// app.use(function(req, res, next) {
//     res.locals.csrfToken = req.csrfToken();
//     next();
// }); //sets token into html placeholder
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

app.get("/", (req, res) => {
    res.redirect("/welcome");
});

app.get("*", function(req, res) {
    res.sendFile(__dirname + "/index.html");
});

app.post("/submit-registration", (req, res) => {
    console.log(req.body);
    queryFunction
        .createUser(
            req.body.firstname,
            req.body.lastname,
            req.body.email,
            req.body.password
        )
        .then(useridResponse => {
            console.log(
                "USER ID RESPONSE AFTER CREATING USER",
                useridResponse.rows[0]
            );
        })
        .catch(e => console.log(chalk.red("CREATEUSER/REGISTER ERROR:"), e));
});

app.post("/login-check", (req, res) => {
    console.log(req.body);
    queryFunction
        .fetchPassword(req.body.email)
        .then(useridResponse => {
            console.log(
                "USER ID RESPONSE AFTER CREATING USER",
                useridResponse.rows[0]
            );
        })
        .catch(e => console.log(chalk.red("CREATEUSER/REGISTER ERROR:"), e));
});

//server listening
app.listen(8080, function() {
    console.log("I'm listening: ");
});
