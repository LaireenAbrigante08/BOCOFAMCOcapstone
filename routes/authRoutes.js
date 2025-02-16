const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController'); 

// Login Routes
router.get('/login', authController.showLoginPage);
router.post('/login', authController.login);

// Logout Route
router.get('/logout', authController.logout);

// Register Routes (General)
router.get('/register', authController.showRegisterPage);
router.post('/register', authController.registerUser);

module.exports = router;
