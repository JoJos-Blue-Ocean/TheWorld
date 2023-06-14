const pool = require('../database/db');

module.exports = {
  getListedTrades(userId) {
    const query = 'SELECT * FROM trades WHERE seller_id=$1 AND status=$2 ORDER BY created_at';
    const values = [userId, 'open'];
    return pool
      .query(query, values)
      .then((results) => results.rows);
  },
  getCompleteTrades(userId) {
    const query = `SELECT trades.*, users.username, users.profile_picture
    FROM trades
    JOIN users ON trades.buyer_id = users.id
    WHERE trades.seller_id = $1 OR trades.buyer_id = $1
    AND trades.status = $2`;
    const values = [userId, 'complete'];
    return pool
      .query(query, values)
      .then((results) => results.rows);
  },
};
