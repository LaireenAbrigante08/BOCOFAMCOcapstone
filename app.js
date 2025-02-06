const express = require('express');
const session = require('express-session');
const path = require('path');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes'); // Authentication routes
const db = require('./config/db'); // Database connection

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

// Route for Landing Page
app.get('/', (req, res) => {
  res.render('landing'); // Ensure 'landing.ejs' exists in the 'views' folder
});

// Route for Admin Home Page
app.get('/admin/home', (req, res) => {
  const adminHomePath = path.join(__dirname, 'views', 'adminHome.ejs');
  if (!require('fs').existsSync(adminHomePath)) {
    return res.status(500).send("Error: adminHome.ejs view file is missing");
  }
  res.render('adminHome');
});

// Authentication routes
app.use('/', authRoutes);

// Catch-all route for handling 404 errors
app.use((req, res) => {
  res.status(404).render('404', { message: 'Page not found' });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
