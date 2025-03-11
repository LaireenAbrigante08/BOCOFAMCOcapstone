const express = require("express");
const router = express.Router();
const loanController = require("../controllers/loanController");

// Route to handle Regular Loan form submission
router.post("/loan-regular", loanController.submitRegularLoan);

module.exports = router;
