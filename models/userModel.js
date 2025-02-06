// models/User.js
const db = require('../config/db');

exports.findById = (user_id, callback) => {
    db.query('SELECT * FROM users WHERE user_id = ?', [user_id], callback);
};

exports.create = (userData, callback) => {
    db.query('INSERT INTO users SET ?', userData, callback);
};