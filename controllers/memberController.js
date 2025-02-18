const bcrypt = require('bcrypt');
const User = require('../models/Member'); // Ensure this model has the correct methods

// Render the change password page
exports.renderChangePasswordPage = (req, res) => {
    if (!req.session.user) {
        return res.redirect('/login');
    }
    res.render('member/change-password', { error: null, success: null });
};

// Handle password update
exports.updatePassword = async (req, res) => {
    try {
        const { currentPassword, newPassword, confirmPassword } = req.body;
        const userId = req.session.user.cb_number;

        if (!currentPassword || !newPassword || !confirmPassword) {
            return res.render('member/change-password', { error: "All fields are required.", success: null });
        }

        if (newPassword !== confirmPassword) {
            return res.render('member/change-password', { error: "New passwords do not match.", success: null });
        }

        const user = await User.findByUserId(userId);
        if (!user) {
            return res.render('member/change-password', { error: "User not found.", success: null });
        }

        // Compare current password with the stored hashed password
        const isMatch = await bcrypt.compare(currentPassword, user.password);
        if (!isMatch) {
            return res.render('member/change-password', { error: "Current password is incorrect.", success: null });
        }

        // Hash the new password before saving
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        await User.updatePassword(userId, hashedPassword);

        return res.render('member/change-password', { error: null, success: "Password updated successfully!" });
    } catch (error) {
        console.error("Password change error:", error);
        return res.render('member/change-password', { error: "Something went wrong! Please try again.", success: null });
    }
};
