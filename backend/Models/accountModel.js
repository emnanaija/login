const pool = require('../Config/db');

class Account {
  constructor(username, email, password) {
    this.username = username;
    this.email = email;
    this.password = password;
  }

  static async getAllAccounts() {
    const result = await pool.query('SELECT * FROM comptes');
    return result.rows;
  }

  static async createAccount(username, email, password) {
    const result = await pool.query('INSERT INTO comptes (username, email, password) VALUES ($1, $2, $3) RETURNING *', [username, email, password]);
    return result.rows[0];
  }

  static async getAccountById(id) {
    const result = await pool.query('SELECT * FROM comptes WHERE id = $1', [id]);
    return result.rows[0];
  }

  static async updateAccount(id, username, email, password) {
    const result = await pool.query('UPDATE comptes SET username = $1, email = $2, password = $3 WHERE id = $4 RETURNING *', [username, email, password, id]);
    return result.rows[0];
  }

  static async deleteAccount(id) {
    await pool.query('DELETE FROM comptes WHERE id = $1', [id]);
  }
}

module.exports = Account;
