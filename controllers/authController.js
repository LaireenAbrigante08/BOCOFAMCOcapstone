// controllers/authController.js
const bcrypt = require('bcrypt');
const db = require('../config/db');
const session = require('express-session');

exports.login = (req, res) => {
    const { user_id, password } = req.body;
    db.query('SELECT * FROM users WHERE user_id = ?', [user_id], async (err, results) => {
        if (err) throw err;
        if (results.length === 0) return res.send('User not found');

        const user = results[0];
        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) return res.send('Incorrect password');

        req.session.user = { user_id: user.user_id, role: user.role };
        if (user.role === 'admin') {
            res.redirect('/admin-home');
        } else {
            res.redirect('/member-home');
        }
    });
};

exports.register = async (req, res) => {
    const { user_id, username, password, email, role } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    db.query('INSERT INTO users (user_id, username, password, email, role) VALUES (?, ?, ?, ?, ?)',
        [user_id, username, hashedPassword, email, role],
        (err) => {
            if (err) throw err;
            res.redirect('/login');
        }
    );
};

exports.logout = (req, res) => {
    req.session.destroy(() => res.redirect('/login'));
};

exports.adminHome = (req, res) => {
    if (!req.session.user || req.session.user.role !== 'admin') {
        return res.redirect('/login');
    }
    res.render('adminHome', { user: req.session.user });
};

exports.memberHome = (req, res) => {
    if (!req.session.user || req.session.user.role !== 'member') {
        return res.redirect('/login');
    }
    res.render('memberHome', { user: req.session.user });
};