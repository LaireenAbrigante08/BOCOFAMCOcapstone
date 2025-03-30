const express = require("express");
const router = express.Router();
const loanController = require("../controllers/loanController");

// Route to handle Regular Agricultural Loan form submission
router.post("/loan-regular", loanController.submitRegularLoan);

// 📌 New Route for Salary/Bonuses Loan Submission
router.post("/loan-salary", loanController.submitSalaryBonusLoan);



module.exports = router;
