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
    // Fetch additional data if needed (e.g., loans, rentals, etc.)
    const userData = {
        cb_number: req.session.user.cb_number,
        username: req.session.user.username,
        loans: [
            { id: 1, amount: 5000, status: 'Active' },
            { id: 2, amount: 10000, status: 'Pending' }
        ],
        rentals: [
            { id: 1, property: 'Apartment A', status: 'Active' },
            { id: 2, property: 'House B', status: 'Inactive' }
        ]
    };

    res.render('member/dashboard', { 
        user: userData, // Pass all user-related data to the template
        title: 'Member Dashboard' // Optional: Add a title for the page
    });
});

// Change Password Routes
router.get('/change-password', isAuthenticatedMember, memberController.renderChangePasswordPage);
router.post('/change-password', isAuthenticatedMember, memberController.updatePassword);


// Route para sa profile page
router.get('/profile', memberController.getProfile);

module.exports = router;