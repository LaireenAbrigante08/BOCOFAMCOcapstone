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
// Render the change password page
exports.renderChangePasswordPage = (req, res) => {
    if (!req.session.user || req.session.user.role !== 'admin') {
        return res.redirect('/login');
    }
    res.render('admin/change-password', { error: null, success: null });
};

// Update admin password
exports.updatePassword = async (req, res) => {
    try {
        const { currentPassword, newPassword, confirmPassword } = req.body;
        const userId = req.session.user.user_id;

        if (newPassword !== confirmPassword) {
            return res.render('admin/change-password', { error: "Passwords do not match", success: null });
        }

        // Find admin by user_id
        User.findByUserId(userId, async (err, user) => {
            if (err || !user) {
                return res.render('admin/change-password', { error: "User not found", success: null });
            }

            // Check if the current password matches
            const isMatch = await bcrypt.compare(currentPassword, user.password);
            if (!isMatch) {
                return res.render('admin/change-password', { error: "Current password is incorrect", success: null });
            }

            // Hash new password and update
            const hashedPassword = await bcrypt.hash(newPassword, 10);
            User.updatePassword(userId, hashedPassword, (err) => {
                if (err) {
                    console.error("Error updating password:", err);
                    return res.render('admin/change-password', { error: "Error updating password", success: null });
                }
                res.render('admin/change-password', { error: null, success: "Password updated successfully!" });
            });
        });
    } catch (error) {
        console.error("Password change error:", error);
        res.render('admin/change-password', { error: "Something went wrong!", success: null });
    }
};
// Ensure module.exports includes all functions
module.exports = exports;
