const pool = require('../database/db');

module.exports = {
  addUser(uid, username, email) {
    const query = `
    INSERT INTO users (uid, username, email)
    VALUES $1, $2, $3`;
    const args = [uid, username, email];
    return pool.query(query, args);
  },
};
