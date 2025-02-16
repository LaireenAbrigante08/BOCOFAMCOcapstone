const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const path = require('path');
const mysql = require('mysql2');
const authRoutes = require('./routes/authRoutes');
const adminRoutes = require('./routes/adminRoutes');
const memberRoutes = require('./routes/memberRoutes'); // Import member routes

const app = express();

// Database Connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'capstone1'
});

db.connect((err) => {
    if (err) {
        console.error('❌ Database connection failed:', err);
        return;
    }
    console.log('✅ Connected to the database');
});

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(session({
    secret: 'secretkey',
    resave: false,
    saveUninitialized: false
}));

// Set EJS as templating engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Routes
app.use('/', authRoutes);
app.use('/admin', adminRoutes);
app.use('/member', memberRoutes);

// Default route
app.get('/', (req, res) => res.redirect('/login'));

// 404 Error Handling
app.use((req, res) => {
    res.status(404).send('404 Not Found');
});

// Server Start
const PORT = 3000;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
