const pool = require('../database/db');

module.exports = {
  getListedTrades(userId) {
    const query = `SELECT
    trades.id, trades.seller_id, trades.have_album_id, trades.want_album_id,
    trades.buyer_id, trades.status, trades.description,
    TO_CHAR(trades.created_at, 'YYYY-MM-DD') AS created_at
     FROM trades WHERE seller_id=$1 AND status=$2 ORDER BY created_at`;
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
    JOIN users ON trades.buyer_id = users.id
    WHERE trades.seller_id = $1 OR trades.buyer_id = $1
    AND trades.status = $2`;
    const values = [userId, 'complete'];
    return pool
      .query(query, values)
      .then((results) => results.rows);
  },
  insertListedTrade(userId, haveAlbumId, wantAlbumId, description) {
    const query = ` INSERT INTO trades
    (seller_id, have_album_id, want_album_id, status, description)
    VALUES ($1, $2, $3, 'open', $4)`;
    const values = [userId, haveAlbumId, wantAlbumId, description];
    return pool
      .query(query, values);
  },
};
