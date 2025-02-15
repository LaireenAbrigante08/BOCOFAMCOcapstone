const bcrypt = require('bcrypt');
const User = require('../models/User');

exports.adminDashboard = (req, res) => {
    if (!req.session.user || req.session.user.role !== 'admin') {
        return res.redirect('/login');
    }
    res.render('admin/dashboard');
};

exports.registerMember = async (req, res) => {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    User.create(username, hashedPassword, 'member', (err) => {
        if (err) return res.status(500).send('Error registering member');
        res.redirect('/admin/dashboard');
    });
};
