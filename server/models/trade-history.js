const pool = require('../database/db');

module.exports = {
  getListedTrades(userId) {
    const query = `SELECT
    trades.id, trades.seller_id, trades.have_album_id, trades.want_album_id,
    trades.buyer_id, trades.status, trades.description,
    TO_CHAR(trades.created_at, 'YYYY-MM-DD') AS created_at
     FROM trades WHERE seller_id = $1 AND status = $2 ORDER BY created_at`;
    const values = [userId, 'open'];
    return pool
      .query(query, values)
      .then((results) => results.rows);
  },
  getCompleteTrades(userId) {
    const query = `SELECT trades.id, trades.seller_id, trades.have_album_id, trades.want_album_id,
    trades.buyer_id, trades.status, trades.description,
    TO_CHAR(trades.created_at, 'YYYY-MM-DD') AS created_at, users.username, users.profile_picture
    FROM trades
    JOIN users ON trades.buyer_id = users.uid
    WHERE trades.seller_id = $1 OR trades.buyer_id = $1
    AND trades.status = $2`;
    const values = [userId, 'complete'];
    return pool
      .query(query, values)
      .then((results) => results.rows);
  },
  insertListedTrade(userId, haveAlbumId, wantAlbumId, description) {
    console.log('userId-------------------', userId);
    const query = ` INSERT INTO trades
    (seller_id, have_album_id, want_album_id, status, description)
    VALUES ($1, $2, $3, 'open', $4)`;
    const values = [userId, haveAlbumId, wantAlbumId, description];
    return pool
      .query(query, values);
  },
  updateToComplete(id, buyerId) {
    const query = `UPDATE trades
    SET status = 'complete', buyer_id = $1
    WHERE id = $2`;
    const values = [buyerId, id];
    return pool
      .query(query, values);
  },
  insertRating(senderId, recipientId, tradeId, rating) {
    const query = `INSERT INTO ratings
    (sender_id, recipient_id, trade_id, rating)
    VALUES ($1, $2, $3, $4)`;
    const values = [senderId, recipientId, tradeId, rating];
    return pool
      .query(query, values);
  },
  getUsers(search) {
    const query = `SELECT
    uid, username, profile_picture
    FROM users
    WHERE username ILIKE $1`;
    const values = [`${search}%`];
    return pool
      .query(query, values)
      .then((results) => results.rows);
  },
};
