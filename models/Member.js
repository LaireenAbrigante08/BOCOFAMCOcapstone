const db = require('../config/db');

const Member = {
    create: (userId, firstName, middleName, lastName, address, dob, email, gender, contactNumber, callback) => {
        db.query(
            'INSERT INTO members (user_id, first_name, middle_name, last_name, address, dob, email, gender, contact_number) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
            [userId, firstName, middleName, lastName, address, dob, email, gender, contactNumber],
            callback
        );
    }
};

module.exports = Member;
