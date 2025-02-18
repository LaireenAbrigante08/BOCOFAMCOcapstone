const express = require('express');
const router = express.Router();
const memberController = require('../controllers/memberController');

// Middleware to check if the user is authenticated as a member
const isAuthenticatedMember = (req, res, next) => {
    if (!req.session || !req.session.user || req.session.user.role !== 'member') {
        return res.redirect('/login');
    }
    next();
};

// Member Dashboard Route
router.get('/dashboard', isAuthenticatedMember, (req, res) => {
    res.render('member/dashboard', { 
        cb_number: req.session.user.cb_number,
        username: req.session.user.username // Ensure username is passed
    });
});

// Change Password Routes
router.get('/change-password', isAuthenticatedMember, memberController.renderChangePasswordPage);
router.post('/change-password', isAuthenticatedMember, memberController.updatePassword);

module.exports = router;
