const pool = require('../database/db');

module.exports = {
  getAllMessages(userId) {
    const query = 'SELECT * FROM messages WHERE sender_id=$1 OR recipient_id=$1';
    const values = [userId];
    return pool
      .query(query, values)
      .then((results) => results.rows);
  },
  sendMessage(senderId, recipientId, body) {
    const query = 'INSERT INTO messages(sender_id, recipient_id, body) VALUES($1, $2, $3)';
    const values = [senderId, recipientId, body];
    return pool.query(query, values);
  },
};
