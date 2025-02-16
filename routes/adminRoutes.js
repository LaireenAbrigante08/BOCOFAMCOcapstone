const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');

router.get('/dashboard', adminController.adminDashboard);
router.get('/register', adminController.renderRegisterPage); // ✅ Add this route
router.post('/register', adminController.registerMember);

module.exports = router;
