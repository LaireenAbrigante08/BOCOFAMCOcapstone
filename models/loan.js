const db = require('../config/db'); // Adjust the path to your database configuration

class Loan {
    static getAllLoanApplications(callback) {
        const query = 'SELECT * FROM loan_applications';
        db.query(query, (err, results) => {
            if (err) {
                console.error('Error fetching loan applications:', err);
                return callback(err, null);
            }
            callback(null, results);
        });
    }
}

module.exports = Loan;