const db = require('../config/db');

const User = {
    create: (userId, password, role, callback) => {
        db.query(
            'INSERT INTO users (user_id, password, role) VALUES (?, ?, ?)',
            [userId, password, role],
            callback
        );
    }
};

module.exports = User;
