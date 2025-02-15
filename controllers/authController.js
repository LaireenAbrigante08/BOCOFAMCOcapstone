const bcrypt = require('bcrypt');
const db = require('../config/db'); // Ensure correct database connection

exports.showLoginPage = (req, res) => {
  res.render('login', { error: null });
};

exports.login = (req, res) => {
  const { username, password } = req.body;

  console.log('🟡 Login Attempt:', username);

  const sql = 'SELECT * FROM users WHERE username = ?';
  db.query(sql, [username], (err, results) => {
      if (err) {
          console.error('❌ Database error:', err);
          return res.render('login', { error: 'Database error' });
      }

      if (results.length === 0) {
          console.log('❌ User not found');
          return res.render('login', { error: 'Invalid username or password' });
      }

      const user = results[0];
      console.log('✅ User Found:', user.username, '| Role:', user.role);

      // Compare password with stored hash
      bcrypt.compare(password, user.password, (err, isMatch) => {
          if (err) {
              console.error('❌ Error verifying password:', err);
              return res.render('login', { error: 'Error verifying password' });
          }

          if (!isMatch) {
              console.log('❌ Incorrect password');
              return res.render('login', { error: 'Invalid username or password' });
          }

          // Store session
          req.session.user = { id: user.id, username: user.username, role: user.role };
          console.log('✅ User Logged In:', req.session.user);

          // Redirect based on role
          if (user.role === 'admin') {
              return res.redirect('/admin/dashboard');
          } else {
              return res.redirect('/member/dashboard');
          }
      });
  });
};

exports.showRegisterPage = (req, res) => {
  res.render('register', { error: null });
};

exports.registerUser = (req, res) => {
  const { username, password, role } = req.body;

  if (!username || !password || !role) {
      return res.render('register', { error: 'All fields are required' });
  }

  // Hash password
  bcrypt.hash(password, 10, (err, hash) => {
      if (err) {
          console.error('❌ Error hashing password:', err);
          return res.render('register', { error: 'Error hashing password' });
      }

      const sql = 'INSERT INTO users (username, password, role) VALUES (?, ?, ?)';
      db.query(sql, [username, hash, role], (err, result) => {
          if (err) {
              console.error('❌ Database error:', err);
              return res.render('register', { error: 'Error creating account' });
          }

          console.log('✅ User registered successfully:', username);
          res.redirect('/login'); // Redirect to login page after registration
      });
  });
};

exports.logout = (req, res) => {
  req.session.destroy(() => {
      res.redirect('/login');
  });
};
