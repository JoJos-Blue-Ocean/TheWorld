const pool = require('../database/db');

module.exports = {
  getRooms(userId) {
    const query = 'SELECT * FROM rooms WHERE user_one=$1 OR user_two=$1 ORDER BY updated_at';
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
  async sendMessage(roomId, senderId, body) {
    const client = await pool.connect();
    await client.query('BEGIN');

    const sendMessageQuery = 'INSERT INTO messages(room_id, sender_user_id, body) VALUES($1, $2, $3) RETURNING *';
    const sendMessageValues = [roomId, senderId, body];
    const sendMessageResponse = await client.query(sendMessageQuery, sendMessageValues);

    const updateTimestamp = sendMessageResponse.rows[0].created_at;
    const updateRoomQuery = 'UPDATE rooms SET updated_at=$1 WHERE id=$2';
    const updateRoomValues = [updateTimestamp, roomId];
    await client.query(updateRoomQuery, updateRoomValues);
    await client.query('COMMIT');
    await client.release();
    return sendMessageResponse.rows[0];
  },
  async makeRoomAndSendMessage(senderId, recipientId, body) {
    const client = await pool.connect();
    await client.query('BEGIN');

    const getUserQuery = 'SELECT * FROM users WHERE uid=$1';
    const getUserValues = [recipientId];
    const getUserResponse = await client.query(getUserQuery, getUserValues);
    const user = getUserResponse.rows[0];

    const makeRoomQuery = 'INSERT INTO rooms(user_one, user_two) VALUES($1, $2) RETURNING *';
    const makeRoomValues = [senderId, recipientId];
    const makeRoomResponse = await client.query(makeRoomQuery, makeRoomValues);
    const room = makeRoomResponse.rows[0]; // Retrieve the room object

    const roomId = room.id; // Get the room number from the room object

    const sendMessageQuery = 'INSERT INTO messages(room_id, sender_user_id, body) VALUES($1, $2, $3) RETURNING *';
    const sendMessageValues = [roomId, senderId, body];
    const sendMessageResponse = await client.query(sendMessageQuery, sendMessageValues);

    const updateTimestamp = sendMessageResponse.rows[0].created_at;
    const updateRoomQuery = 'UPDATE rooms SET updated_at=$1 WHERE id=$2';
    const updateRoomValues = [updateTimestamp, roomId];
    await client.query(updateRoomQuery, updateRoomValues);
    await client.query('COMMIT');
    await client.release();

    // Return both the user and room information
    return {
      user,
      room
    };
  },
  checkRoom(userId, sellerId) {
    const query = 'SELECT * FROM rooms where (user_one=$1 OR user_two=$1) AND (user_one=$2 OR user_two=$2)';
    const values = [userId, sellerId];
    return pool
      .query(query, values)
      .then((results) => results.rows);
  },
};
