const pool = require('../database/db');

module.exports = {
  getProfile(useruid) {
    const query = ` SELECT
    users.username,
    users.uid,
    users.profile_picture,
    users.biography,
    users.location,
    avg(ratings.rating) AS average_rating,
      (SELECT COUNT(*)
      AS reviews
      FROM users
      JOIN ratings
      ON users.uid=recipient_id
      WHERE users.uid=$1),
      (SELECT COUNT(*)
      AS trades
      FROM users
      JOIN trades
      ON users.uid=seller_id
      WHERE users.uid=$1
      AND trades.status='closed')
    FROM users
    JOIN ratings on users.uid=recipient_id
    WHERE users.uid=$1
    GROUP BY
    users.uid,
    users.username,
    users.profile_picture,
    users.biography,
    users.location;`;
    const values = [useruid];
    return pool.query(query, values)
    .then((results) => {
        console.log('im here', results);
        return results.rows;
      });
  },
  updateProfile(user) {
    const query = ` UPDATE
    users
    SET
    location=$1,
    biography=$2
    WHERE users.uid=$3;
    `;
    const values = [ user.location, user.biography, user.uid];
    return pool.query(query, values)
      .then((results) => results.rows);
  },
  updatePfp(user) {
    const query = ` UPDATE
    users
    SET
    profile_picture=$1
    WHERE users.uid=$2;`;
    const values = [user.profile_picture, user.user_id];
    return pool.query(query, values)
      .then(() => user.profile_picture);
  },
  getSimpleProfile(selectedUserId, personalId) {
    const query = 'SELECT users.uid, users.username, users.profile_picture, rooms.id AS room_id from users JOIN rooms on ((users.uid=rooms.user_one OR users.uid=rooms.user_two) AND (rooms.user_one=$2 OR rooms.user_two=$2)) WHERE users.uid=$1';
    const values = [selectedUserId, personalId];
    return pool
      .query(query, values)
      .then((results) => results.rows);
  },
  getSingleUser(userId) {
    const query = 'SELECT * from users WHERE uid=$1';
    const values = [userId];
    return pool
      .query(query, values)
      .then((results) => results.rows[0]);
  },
};

/*

UPDATE
    users
    SET profile_picture = 'https://www.freeiconspng.com/img/25954',
    location='Working',
    biography='Working'
    WHERE users.uid='abc124';



SELECT
    users.username,
    users.profile_picture,
    users.biography,
    users.location,
    avg(ratings.rating) AS average_rating,
      (SELECT COUNT(*)
      AS reviews
      FROM users
      JOIN ratings
      ON users.uid=ratings.recipient_id
      WHERE users.uid=1),
      (SELECT COUNT(*)
      AS trades
      FROM users
      JOIN trades
      ON users.uid=seller_uid
      WHERE users.uid=1
      AND trades.status='closed')
    FROM users
    JOIN ratings on users.uid=ratings.recipient-id
    WHERE users.uid=1
    GROUP BY
    users.username,
    users.profile_picture,
    users.biography,
    users.location;
*/