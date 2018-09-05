const bcrypt = require("bcryptjs");
const { promisify } = require("util");

const genSalt = promisify(bcrypt.genSalt);
const hash = promisify(bcrypt.hash);
const compare = promisify(bcrypt.compare);

module.exports.hashPass = password => {
    return genSalt().then(salt => {
        return hash(password, salt);
    });
};

module.exports.checkPass = (password, hash) => {
    return compare(password, hash);
};

module.exports.passRestrictions = password => {
    if (password.length < 8) {
        return false;
    } else {
        let upper = 0;
        let lower = 0;
        let num = 0;
        for (let i = 0; i < password.length; i++) {
            if (
                password[i] == password[i].toUpperCase() &&
                isNaN(password[i])
            ) {
                upper += 1;
            }
            if (
                password[i] == password[i].toLowerCase() &&
                isNaN(password[i])
            ) {
                lower += 1;
            }
            if (!isNaN(password[i])) {
                num += 1;
            }
        }
        if (upper > 0 && lower > 0 && num > 0) {
            return true;
        } else {
            return false;
        }
    }
};
