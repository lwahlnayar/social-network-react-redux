const spicedPg = require("spiced-pg");

//Makes connection from server to database
const db = spicedPg(process.env.DATABASE_URL || require("./secrets.json").url);

module.exports.createUser = function(firstname, lastname, email, password) {
    return db.query(
        `INSERT INTO users (firstname, lastname, email, password) VALUES ($1, $2, $3, $4) RETURNING id`,
        [firstname || null, lastname || null, email || null, password || null]
    );
};

module.exports.fetchPassword = function(email) {
    return db.query(`SELECT password FROM users WHERE email = $1`, [
        email || null
    ]);
};

module.exports.fetchId = function(email) {
    return db.query(`SELECT id FROM users WHERE email = $1`, [email || null]);
};

module.exports.fetchUserData = function(id) {
    return db.query(`SELECT * FROM users WHERE id = $1`, [id || null]);
};

module.exports.updateAvatar = function(id, avatar_url) {
    return db.query(`UPDATE users SET avatar = $2 WHERE id = $1`, [
        id || null,
        avatar_url || null
    ]);
};

module.exports.postBio = function(id, user_bio) {
    return db.query(`UPDATE users SET user_bio = $2 WHERE id = $1`, [
        id || null,
        user_bio || null
    ]);
};

module.exports.fetchOtherUsersData = function(id) {
    return db.query(`SELECT * FROM users WHERE id = $1`, [id || null]);
};

module.exports.checkFriendStatus = function(userId, otherUserId) {
    return db.query(
        `SELECT * FROM friend_requests WHERE (sender_id = $1 AND receiver_id = $2) OR (sender_id = $2 AND receiver_id = $1)`,
        [userId || null, otherUserId || null]
    );
};

module.exports.addFriend = function(sender_id, receiver_id, status) {
    return db.query(
        `INSERT INTO friend_requests (sender_id, receiver_id, status)
                      VALUES ($1, $2, $3)`,
        [sender_id || null, receiver_id || null, status || null]
    );
};

module.exports.acceptFriendReq = function(userId, otherUserId) {
    return db.query(
        `UPDATE friend_requests SET status = 2 WHERE (sender_id = $1 AND receiver_id = $2) OR (sender_id = $2 AND receiver_id = $1)`,
        [userId || null, otherUserId || null]
    );
};

module.exports.deleteFriendRow = function(userId, otherUserId) {
    return db.query(
        `DELETE FROM friend_requests WHERE (sender_id = $1 AND receiver_id = $2) OR (sender_id = $2 AND receiver_id = $1)`,
        [userId || null, otherUserId || null]
    );
};

module.exports.fetchFriendsWannabes = function(userId) {
    return db.query(
        `
          SELECT users.id, users.firstname, users.lastname, users.avatar, friend_requests.status
          FROM friend_requests
          JOIN users
          ON (status = 1 AND receiver_id = $1 AND sender_id = users.id)
          OR (status = 2 AND receiver_id = $1 AND sender_id = users.id)
          OR (status = 2 AND sender_id = $1 AND receiver_id = users.id)`,
        [userId || null]
    );
};

module.exports.getOnlineUsers = function(arrayUserIds) {
    return db.query(
        `SELECT id, firstname, lastname, avatar FROM users WHERE id = ANY($1)`,
        [arrayUserIds || null]
    );
};

///////////////////////////////POSTGRES CHAT////////////////////////////////////

module.exports.postChatMessage = function(userId, message) {
    return db.query(
        `INSERT INTO chat (messages, sender_id) VALUES ($2, $1)
         RETURNING id`,
        [userId || null, message || null]
    );
};

module.exports.fetchChatDataMounted = function() {
    return db.query(
        `SELECT chat.id, chat.messages, chat.created_at, chat.sender_id,
         users.firstname, users.lastname, users.avatar
         FROM chat
         JOIN users
         ON (chat.sender_id = users.id)
         ORDER BY chat.id DESC LIMIT 10`
    );
};

module.exports.fetchLastMessage = function(chatId) {
    return db.query(
        `SELECT chat.id, chat.messages, chat.created_at, chat.sender_id,
         users.firstname, users.lastname, users.avatar
         FROM chat
         JOIN users
         ON (chat.sender_id = users.id)
         WHERE chat.id = $1`,
        [chatId]
    );
};

module.exports.fetchSearchedUsers = function(search) {
    search += "%";
    return db.query(
        `SELECT id, firstname, lastname, avatar
         FROM users
         WHERE (firstname ILIKE $1) OR (lastname ILIKE $1)
         ORDER BY lastname ASC LIMIT 4`,
        [search]
    );
};

module.exports.postWall = function(
    id,
    otherUserId,
    text,
    firstname_sender,
    lastname_sender,
    avatar_sender
) {
    return db.query(
        `INSERT INTO wall (sender_id, receiver_id, wallposts,
         firstname_sender, lastname_sender, avatar_sender) VALUES ($1, $2, $3, $4, $5, $6)
         RETURNING id`,
        [
            id,
            otherUserId,
            text || null,
            firstname_sender || null,
            lastname_sender || null,
            avatar_sender || null
        ]
    );
};

module.exports.fetchWallPosts = function(otherUserId) {
    return db.query(
        `SELECT wall.id, wall.wallposts, wall.sender_id, wall.receiver_id,
         users2.firstname as firstname_sender, users2.lastname as lastname_sender,
         users.firstname as firstname_receiver, users.lastname as lastname_receiver,
         users.avatar as avatar_receiver, users2.avatar as avatar_sender, wall.created_at
         FROM wall
         JOIN users ON (wall.receiver_id = users.id)
         JOIN users AS users2 ON (wall.sender_id = users2.id) WHERE (wall.receiver_id=$1)
         ORDER BY created_at DESC LIMIT 5;
        `,
        [otherUserId]
    );
};
