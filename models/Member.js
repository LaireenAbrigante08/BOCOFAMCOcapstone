const db = require('../config/db');

const Member = {
    // Create a new member
    create: (userId, firstName, middleName, lastName, address, dob, email, gender, contactNumber, callback) => {
        db.query(
            'INSERT INTO members (user_id, first_name, middle_name, last_name, address, dob, email, gender, contact_number) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
            [userId, firstName, middleName, lastName, address, dob, email, gender, contactNumber],
            callback
        );
    },

    // Find a member by user_id
    findByUserId: (userId) => {
        return new Promise((resolve, reject) => {
            db.query(
                'SELECT * FROM users WHERE user_id = ?',
                [userId],
                (err, results) => {
                    if (err) reject(err);
                    else resolve(results.length > 0 ? results[0] : null);
                }
            );
        });
    },

    // Update password for a member
    updatePassword: (userId, newPassword) => {
        return new Promise((resolve, reject) => {
            db.query(
                'UPDATE users SET password = ? WHERE user_id = ?',
                [newPassword, userId],
                (err, results) => {
                    if (err) reject(err);
                    else resolve(results);
                }
            );
        });
    }
};

module.exports = Member;
