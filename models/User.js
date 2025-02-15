const db = require('../config/db');

const User = {
    findByUsername: (username, callback) => {
        db.query('SELECT * FROM users WHERE username = ?', [username], callback);
    },
    
    create: (username, hashedPassword, role, callback) => {
        db.query('INSERT INTO users (username, password, role) VALUES (?, ?, ?)', 
                 [username, hashedPassword, role], callback);
    }
};

module.exports = User;
