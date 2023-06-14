const pool = require('../database/db');

module.exports = {
  getRooms(userId) {
    const query = 'SELECT * FROM rooms WHERE user_one=$1 OR user_two=$1';
    const values = [userId];
    return pool
      .query(query, values)
      .then((results) => results.rows);
  },
  getMessages(roomId) {
    const query = 'SELECT * FROM messages WHERE room_id=$1';
    const values = [roomId];
    return pool
      .query(query, values)
      .then((results) => results.rows);
  },
  sendMessage(roomId, senderId, body) {
    const query = 'INSERT INTO messages(room_id, sender_user_id, body) VALUES($1, $2, $3)';
    const values = [roomId, senderId, body];
    return pool.query(query, values);
  },
};
