// routes/authRoutes.js
const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.get('/login', (req, res) => res.render('login'));
router.post('/login', authController.login);
router.get('/register', (req, res) => res.render('register'));
router.post('/register', authController.register);
router.get('/logout', authController.logout);
router.get('/admin-home', authController.adminHome);
router.get('/member-home', authController.memberHome);

module.exports = router;