const bcrypt = require('bcrypt');
const User = require('../models/User');
const Member = require('../models/Member');

exports.adminDashboard = (req, res) => {
    if (!req.session.user || req.session.user.role !== 'admin') {
        return res.redirect('/login');
    }
    res.render('admin/dashboard');
};

// This function should be added to render the registration page
exports.renderRegisterPage = (req, res) => {
    res.render('admin/register', { error: null }); // ✅ Ensure `error` is always passed
};


exports.registerMember = async (req, res) => {
    try {
        const { user_id, password, role, first_name, middle_name, last_name, address, dob, email, gender, contact_number } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);

        // Insert into users table
        User.create(user_id, hashedPassword, role, (err) => {
            if (err) {
                console.error("Error inserting into users table:", err);
                return res.status(500).render('admin/register', { error: "Error registering user" });
            }

            // Insert into members table
            Member.create(user_id, first_name, middle_name, last_name, address, dob, email, gender, contact_number, (err) => {
                if (err) {
                    console.error("Error inserting into members table:", err);
                    return res.status(500).render('admin/register', { error: "Error registering member" });
                }
                res.redirect('/admin/dashboard');
            });
        });
    } catch (error) {
        console.error("Registration error:", error);
        res.status(500).render('admin/register', { error: "Something went wrong!" });
    }
};

// Ensure module.exports includes all functions
module.exports = exports;
