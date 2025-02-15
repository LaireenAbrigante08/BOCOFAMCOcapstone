const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController'); // Ensure this path is correct

// Login Route (GET)
router.get('/login', authController.showLoginPage);

// Login Route (POST)
router.post('/login', authController.login);

// Logout Route
router.get('/logout', authController.logout);

// Admin Register Page (GET)
router.get('/admin/register', authController.showRegisterPage);

// Admin Register Handler (POST)
router.post('/admin/register', authController.registerUser);


module.exports = router;
