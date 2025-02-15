const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');

router.get('/dashboard', adminController.adminDashboard);
router.post('/register', adminController.registerMember);

module.exports = router;
