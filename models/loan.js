const db = require('../config/db');

class Loan {
    static getAllRegularLoans(callback) {
        const query = 'SELECT * FROM regular_agricultural_loans';
        db.query(query, (err, results) => {
            if (err) {
                console.error('❌ Error fetching Regular Loans:', err);
                return callback(err, null);
            }
            callback(null, results);
        });
    }

    static getAllSalaryBonusLoans(callback) {
        const query = 'SELECT * FROM salary_bonuses_loans';
        db.query(query, (err, results) => {
            if (err) {
                console.error('❌ Error fetching Salary/Bonuses Loans:', err);
                return callback(err, null);
            }
            callback(null, results);
        });
    }
}

module.exports = Loan;
