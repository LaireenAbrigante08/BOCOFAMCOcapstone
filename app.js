const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const path = require('path');

const authRoutes = require('./routes/authRoutes');
const adminRoutes = require('./routes/adminRoutes');
const memberRoutes = require('./routes/memberRoutes'); // Import member routes

const app = express();

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(session({
    secret: 'secretkey',
    resave: false,
    saveUninitialized: true
}));

// Set EJS as templating engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Routes
app.use(authRoutes);
app.use('/admin', adminRoutes);
app.use('/member', memberRoutes); // Use member routes

// Default route
app.get('/', (req, res) => res.redirect('/login'));

// Server Start
app.listen(3000, () => console.log('Server running on http://localhost:3000'));
