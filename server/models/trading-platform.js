const pool = require('../database/db');

module.exports = {
  getActiveTrades(albumId) {
    const query = `SELECT
    trades.seller_id,
    trades.have_album_id,
    trades.want_album_id,
    trades.status,
    trades.description,
    trades.created_at,
    users.username,
    users.profile_picture,
    avg(ratings.rating) AS average_rating,
    count(ratings.rating) AS ratings_count
    FROM trades
    JOIN users ON trades.seller_id=users.id
    JOIN ratings ON trades.seller_id=ratings.recipient_id
    WHERE have_album_id=$1
    AND status=$2
    GROUP BY
    trades.seller_id,
    trades.have_album_id,
    trades.want_album_id,
    trades.status,
    trades.description,
    trades.created_at,
    users.username,
    users.profile_picture
    ORDER BY trades.created_at`;
    const values = [albumId, 'open'];
    return pool
      .query(query, values)
      .then((results) => results.rows);
  },
};
