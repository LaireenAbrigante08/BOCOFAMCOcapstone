const db = require('../config/db');

const Member = {
    // Create a new member
    create: (cbNumber, firstName, middleName, lastName, address, dob, email, gender, contactNumber, beneficiaries, 
             emergencyName, emergencyRelationship, emergencyAddress, emergencyContact, dateIssued, callback) => {
        db.query(
            'INSERT INTO members (cb_number, first_name, middle_name, last_name, address, dob, email, gender, contact_number, beneficiaries, emergency_name, emergency_relationship, emergency_address, emergency_contact, date_issued) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
            [cbNumber, firstName, middleName, lastName, address, dob, email, gender, contactNumber, beneficiaries, 
             emergencyName, emergencyRelationship, emergencyAddress, emergencyContact, dateIssued],
            callback
        );
    },

    // Find a member by cb_number
    findByCbNumber: (cbNumber) => {
        return new Promise((resolve, reject) => {
            db.query(
                'SELECT * FROM members WHERE cb_number = ?',
                [cbNumber],
                (err, results) => {
                    if (err) reject(err);
                    else resolve(results.length > 0 ? results[0] : null);
                }
            );
        });
    },

    // Find a user by cb_number in the users table
    findByUserId: (cbNumber) => {
        return new Promise((resolve, reject) => {
            db.query(
                'SELECT * FROM users WHERE cb_number = ?',
                [cbNumber],
                (err, results) => {
                    if (err) reject(err);
                    else resolve(results.length > 0 ? results[0] : null);
                }
            );
        });
    },

    // Update password for a user in the users table
    updatePassword: (cbNumber, newPassword) => {
        return new Promise((resolve, reject) => {
            db.query(
                'UPDATE users SET password = ? WHERE cb_number = ?',
                [newPassword, cbNumber],
                (err, results) => {
                    if (err) reject(err);
                    else resolve(results);
                }
            );
        });
    }
};

module.exports = Member;
