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

module.exports.acceptFriendReq = function(id) {
    return db.query(
        `UPDATE friend_requests SET status = 2 WHERE receiver_id = $1`,
        [id || null]
    );
};

module.exports.deleteFriendRow = function(userId, otherUserId) {
    return db.query(
        `DELETE FROM friend_requests WHERE (sender_id = $1 AND receiver_id = $2) OR (sender_id = $2 AND receiver_id = $1)`,
        [userId || null, otherUserId || null]
    );
};

// module.exports.fetchFriendsWannabes = function() {
//     return db.query(
//         `
//           SELECT users.id, first, last, image, status
//           FROM friendships
//           JOIN users
//           ON (status = 1 AND recipient_id = $1 AND requester_id = users.id)
//           OR (status = 2 AND recipient_id = $1 AND requester_id = users.id)
//           OR (status = 2 AND requester_id = $1 AND recipient_id = users.id)
//       `
//     );
// };
