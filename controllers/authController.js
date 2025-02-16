const bcrypt = require('bcrypt');
const db = require('../config/db'); // Ensure correct database connection

// Show Login Page
exports.showLoginPage = (req, res) => {
  res.render('login', { error: null });
};

// Login Function
exports.login = (req, res) => {
  const { user_id, password } = req.body; 

  console.log('🟡 Login Attempt:', user_id);

  if (!user_id || !password) {
    return res.render('login', { error: 'User ID and password are required' });
  }

  const sql = 'SELECT * FROM users WHERE user_id = ?';
  db.query(sql, [user_id], (err, results) => {
    if (err) {
      console.error('❌ Database error:', err);
      return res.render('login', { error: 'An unexpected error occurred' });
    }

    console.log('🔍 SQL Result:', results);
    if (results.length === 0) {
      console.log('❌ User ID not found:', user_id);
      return res.render('login', { error: 'Invalid User ID or password' });
    }

    const user = results[0];
    console.log('✅ User Found:', user.user_id, '| Role:', user.role);

    // Compare password
    bcrypt.compare(password, user.password, (err, isMatch) => {
      if (err) {
        console.error('❌ Error verifying password:', err);
        return res.render('login', { error: 'Error verifying password' });
      }

      if (!isMatch) {
        console.log('❌ Incorrect password for:', user_id);
        return res.render('login', { error: 'Invalid User ID or password' });
      }

      // Store session
      req.session.user = { id: user.id, user_id: user.user_id, role: user.role };
      console.log('✅ Session Data:', req.session.user);

      // Redirect based on role
      return user.role === 'admin' ? res.redirect('/admin/dashboard') : res.redirect('/member/dashboard');
    });
  });
};

// Show Registration Page
exports.showRegisterPage = (req, res) => {
  res.render('register', { error: null });
};

// Register New User
exports.registerUser = (req, res) => {
  const { user_id, password, role } = req.body; 

  if (!user_id || !password || !role) {
    return res.render('register', { error: 'All fields are required' });
  }

  bcrypt.hash(password, 10, (err, hash) => {
    if (err) {
      console.error('❌ Error hashing password:', err);
      return res.render('register', { error: 'Error hashing password' });
    }
    
    console.log('🔑 Hashed Password for', user_id, ':', hash);

    const sql = 'INSERT INTO users (user_id, password, role) VALUES (?, ?, ?)';
    db.query(sql, [user_id, hash, role], (err, result) => {
      if (err) {
        console.error('❌ Database error:', err);
        return res.render('register', { error: 'Error creating account' });
      }

      console.log('✅ User registered successfully:', user_id);
      res.redirect('/login'); 
    });
  });
};

// Logout
exports.logout = (req, res) => {
  req.session.destroy(() => {
    res.redirect('/login');
  });
};
