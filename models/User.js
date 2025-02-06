const db = require('../config/db');
const bcrypt = require('bcrypt');

class User {
  static async findByEmail(email) {
    return new Promise((resolve, reject) => {
      db.query('SELECT * FROM users WHERE email = ?', [email], (err, results) => {
        if (err) reject(err);
        resolve(results[0]); // Return the first result
      });
    });
  }

  static async create(username, email, password, role = 'member') {
    const hashedPassword = await bcrypt.hash(password, 10);
    return new Promise((resolve, reject) => {
      db.query(
        'INSERT INTO users (username, email, password, role) VALUES (?, ?, ?, ?)',
        [username, email, hashedPassword, role],
        (err, results) => {
          if (err) reject(err);
          resolve(results);
        }
      );
    });
  }
}

module.exports = User;
