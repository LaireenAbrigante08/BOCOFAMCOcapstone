const db = require('../config/db');

const User = {
    create: (userId, password, role, callback) => {
        db.query(
            'INSERT INTO users (user_id, password, role) VALUES (?, ?, ?)',
            [userId, password, role],
            callback
        );
    },

    findByUserId: (userId, callback) => {
        db.query(
            'SELECT * FROM users WHERE user_id = ?',
            [userId],
            (err, results) => {
                if (err) return callback(err, null);
                if (results.length === 0) return callback(null, null); // Walang user na nahanap
                return callback(null, results[0]); // Ibalik ang unang result
            }
        );
    },

    updatePassword: (userId, newPassword, callback) => {
        db.query(
            'UPDATE users SET password = ? WHERE user_id = ?',
            [newPassword, userId],
            callback
        );
    }
};

module.exports = User;
