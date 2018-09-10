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

module.exports.getOtherUsersData = function(id) {
    return db.query(`SELECT * FROM users WHERE id = $1`, [id || null]);
};

// module.exports.getAllData = function() {
//     return db
//         .query(
//             `SELECT
//              users.id,
//              users.first_name,
//              users.last_name,
//              user_profiles.homepage,
//              user_profiles.city,
//              user_profiles.age,
//              signatures.signature
//              FROM users
//              LEFT JOIN user_profiles
//                 ON users.id = user_profiles.user_id
//              JOIN signatures
//                 ON users.id = signatures.user_id`
//         )
//         .then(results => {
//             return results.rows;
//         });
// };
//
// module.exports.getUserEditData = function(idarg) {
//     return db
//         .query(
//             `SELECT
//            users.first_name,
//            users.last_name,
//            users.email,
//            users.password,
//            user_profiles.homepage,
//            user_profiles.city,
//            user_profiles.age
//            FROM users
//            LEFT JOIN user_profiles
//               ON users.id = user_profiles.user_id
//            WHERE users.id = $1`,
//             [idarg || null]
//         )
//         .then(results => {
//             return results.rows[0];
//         });
// };
// /////////////////////////////////////////////////////////////
// //////////////////////////EDIT QUERY FUNCTIONS /////////////
// module.exports.updateUserTable = function(firstname, lastname, email, id) {
//     return db.query(
//         `UPDATE users
//              SET first_name = $1, last_name = $2, email = $3
//              WHERE id = $4;
//             `,
//         [firstname || null, lastname || null, email || null, id || null]
//     );
// };
//
// module.exports.updateUserTablePw = function(
//     firstname,
//     lastname,
//     email,
//     password,
//     id
// ) {
//     return db.query(
//         `UPDATE users
//                  SET first_name = $1, last_name = $2, email = $3, password = $4
//                  WHERE id = $5;
//             `,
//         [
//             firstname || null,
//             lastname || null,
//             email || null,
//             password || null,
//             id || null
//         ]
//     );
// };
//
// module.exports.upsertUserProfiles = function(homepage, city, age, id) {
//     return db.query(
//         `INSERT INTO user_profiles (homepage, city, age, user_id)
//            VALUES ($1, $2, $3, $4)
//            ON CONFLICT (user_id)
//            DO UPDATE SET homepage = $1, city = $2, age = $3;
//           `,
//         [homepage || null, city || null, age || null, id]
//     );
// };
//
// /////////////////////////////////////////////////////////////
// ////////////////////////////////////////////////////////////
//
// module.exports.pushSigs = function(sigarg, idarg) {
//     return db.query(
//         `INSERT INTO signatures (signature, user_id) VALUES ($1, $2) RETURNING id`,
//         [sigarg || null, idarg || null]
//     );
// };
//
// module.exports.createUser = function(
//     firstnamearg,
//     lastnamearg,
//     emailarg,
//     passwordarg
// ) {
//     return db.query(
//         `INSERT INTO users (first_name, last_name, email, password) VALUES ($1, $2, $3, $4) RETURNING id`,
//         [
//             firstnamearg || null,
//             lastnamearg || null,
//             emailarg || null,
//             passwordarg || null
//         ]
//     );
// };
//
// module.exports.getPasswordSql = function(emailarg) {
//     return db.query(`SELECT password FROM users WHERE email = $1`, [
//         emailarg || null
//     ]);
// };
//
// module.exports.getIdSql = function(emailarg) {
//     return db.query(`SELECT id FROM users WHERE email = $1`, [
//         emailarg || null
//     ]);
// };
//
// module.exports.getNames = function(idarg) {
//     return db.query(`SELECT first_name, last_name FROM users WHERE id = $1`, [
//         idarg || null
//     ]);
// };
//
// module.exports.getSignature = function(idarg) {
//     return db.query(`SELECT signature FROM signatures WHERE id = $1`, [idarg]);
// };
//
// module.exports.countSignatures = function() {
//     return db.query(`SELECT count(*) FROM signatures`);
// };
//
// module.exports.getIdSig = function(idarg) {
//     return db.query(`SELECT id FROM signatures WHERE user_id = $1`, [
//         idarg || null
//     ]);
// };
//
// module.exports.getCitySigs = function(cityarg) {
//     return db
//         .query(
//             `SELECT
//              users.id,
//              users.first_name,
//              users.last_name,
//              user_profiles.homepage,
//              user_profiles.city,
//              user_profiles.age
//              FROM users
//              LEFT JOIN user_profiles
//                 ON users.id = user_profiles.user_id
//              JOIN signatures
//                 ON users.id = signatures.user_id
//          WHERE user_profiles.city = $1`,
//             [cityarg || null]
//         )
//         .then(results => {
//             return results.rows;
//         });
// };
//
// module.exports.deleteSigRow = function(sigId) {
//     return db.query(`DELETE FROM signatures WHERE id = $1;`, [sigId]);
// };
