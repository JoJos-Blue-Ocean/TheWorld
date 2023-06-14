const pool = require('../database/db');

module.exports = {
  getUsers(userId) {
    const query = 'SELECT DISTINCT sender_id AS users FROM messages WHERE recipient_id=$1 UNION SELECT DISTINCT recipient_id FROM messages WHERE sender_id=$1';
    const values = [userId];
    return pool
      .query(query, values)
      .then((results) => results.rows);
  },
  getMessages(firstId, secondId) {
    const query = 'SELECT * FROM messages WHERE (sender_id=$1 AND recipient_id=$2) OR (sender_id=$2 AND recipient_id=$1) ORDER BY created_at';
    const values = [firstId, secondId];
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
