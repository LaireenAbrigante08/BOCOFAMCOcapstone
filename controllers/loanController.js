const db = require("../config/db");

exports.submitRegularLoan = (req, res) => {
    const {
        cb_number,
        application_no,
        date_of_application,
        member_name,
        address,
        contact_no,
        loan_type,
        purpose,
        loan_amount,
        annual_income,
        source_of_income,
        signature_borrower,
        cbu_status,
        borrower_category,
        loan_balance_status
    } = req.body;

    // Validate required fields
    if (!cb_number || !application_no || !date_of_application || !member_name || !address || !contact_no || !loan_type || !purpose || !loan_amount || !signature_borrower || !cbu_status || !borrower_category || !loan_balance_status) {
        return res.json({ success: false, message: "All required fields must be filled out." });
    }

    const sql = `INSERT INTO loan_applications 
                (cb_number, application_no, date_of_application, member_name, address, contact_no, loan_type, purpose, loan_amount, annual_income, source_of_income, signature_borrower, cbu_status, borrower_category, loan_balance_status) 
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

    db.query(sql, [
        cb_number,
        application_no,
        date_of_application,
        member_name,
        address,
        contact_no,
        loan_type,
        purpose,
        loan_amount,
        annual_income || null,
        source_of_income || null,
        signature_borrower,
        cbu_status,
        borrower_category,
        loan_balance_status
    ], (err, result) => {
        if (err) {
            console.error("❌ Error submitting loan application:", err);
            return res.json({ success: false, message: "Failed to submit loan application. Please try again." });
        }

        console.log("✅ Loan application submitted successfully:", result.insertId);
        return res.json({ success: true, message: "Loan application submitted successfully!" });
    });
};