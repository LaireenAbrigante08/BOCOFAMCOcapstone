const User = require('../models/User');
const bcrypt = require('bcrypt');

exports.getLogin = (req, res) => {
  res.render('login', { error: null });
};

exports.postLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findByEmail(email);
    if (!user) {
      return res.render('login', { error: 'Invalid email or password' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.render('login', { error: 'Invalid email or password' });
    }

    req.session.user = { id: user.id, role: user.role };
    
    if (user.role === 'admin') {
      return res.redirect('/admin/home');
    } else {
      return res.redirect('/member/home');
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
};

exports.getRegister = (req, res) => {
  res.render('register', { error: null });
};

exports.postRegister = async (req, res) => {
  const { username, email, password, role } = req.body;

  try {
    const existingUser = await User.findByEmail(email);
    if (existingUser) {
      return res.render('register', { error: 'Email already exists' });
    }

    await User.create(username, email, password, role);
    res.redirect('/login');
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
};

exports.logout = (req, res) => {
  req.session.destroy(() => {
    res.redirect('/login');
  });
};
