const pool = require('../database/db');

module.exports = {
  getProfile(userid) {
    const query = ` SELECT
    users.username,
    users.profile_picture,
    users.biography,
    users.location,
    avg(ratings.rating) AS average_rating,
      (SELECT COUNT(*)
      AS reviews
      FROM users
      JOIN ratings
      ON users.id=recipient_id
      WHERE users.id=$1),
      (SELECT COUNT(*)
      AS trades
      FROM users
      JOIN trades
      ON users.id=seller_id
      WHERE users.id=$1
      AND trades.status='closed')
    FROM users
    JOIN ratings on users.id=recipient_id
    WHERE users.id=$1
    GROUP BY
    users.username,
    users.profile_picture,
    users.biography,
    users.location;`;
    const values = [userid];
    return pool.query(query, values)
      .then((results) => results.rows);
  },
};
