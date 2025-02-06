const express = require('express');
const session = require('express-session');
const path = require('path');
const bodyParser = require('body-parser');
const db = require('./config/db'); // Database connection

const authRoutes = require('./routes/authRoutes'); // Import authentication routes

const app = express();
const PORT = process.env.PORT || 3003; // Use environment variable for port if available

// Middleware setup
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Set up EJS view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Session setup
app.use(session({
  secret: process.env.SESSION_SECRET || 'your-secret-key', // Use environment variable for security
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false, httpOnly: true, maxAge: 1000 * 60 * 60 } // 1-hour session expiry
}));

// Serve static files (CSS, JS, images)
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use(authRoutes); // Include authentication routes

// Landing Page
app.get('/', (req, res) => {
  res.render('landing');
});

// Admin Home Page (Only for Admins)
app.get('/admin/home', (req, res) => {
  if (!req.session.user || req.session.user.role !== 'admin') {
    return res.redirect('/login');
  }
  res.render('admin/adminHome', { user: req.session.user }); // Corrected path
});

// Member Home Page (Only for Members)
app.get('/member/home', (req, res) => {
  if (!req.session.user || req.session.user.role !== 'member') {
    return res.redirect('/login');
  }
  res.render('member/memberHome', { user: req.session.user }); // Ensure correct path
});

// Logout Route
app.get('/logout', (req, res) => {
  req.session.destroy(() => {
    res.redirect('/login');
  });
});

// Catch-all route for handling 404 errors
app.use((req, res) => {
  res.status(404).render('404', { message: 'Page not found' });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
