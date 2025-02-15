const express = require('express');
const router = express.Router();

router.get('/dashboard', (req, res) => {
    if (!req.session || !req.session.user || req.session.user.role !== 'member') {
        return res.redirect('/login');
    }
    res.render('member/dashboard', { username: req.session.user.username }); // Corrected view path
});

module.exports = router;
