const pool = require('../database/db');

module.exports = {

  getWishList(userid) {
    console.log('I am in model wishlist');
    const wishListQuery = {
      text: `SELECT user_id, artist_name, album_name, genre, image FROM wishlist
      WHERE user_id =$1`,
      values: [userid],
    };
    return pool.query(wishListQuery).then((results) => results.rows).catch((err) => console.log('cannot get wishlist data from db', err));
  },
  addWishlist: (request) => {
    const values = [request.user_id, request.album_id,
      request.artist_name, request.album_name, request.genre, request.image];
    const query = 'INSERT INTO wishlist (user_id, album_id, artist_name, album_name, genre, image) VALUES ($1, $2, $3, $4, $5, $6)';
    return pool.query(query, values);
  },
  checkWishlist: (request) => {
    const values = [request.user_id, request.album_id];
    const query = 'SELECT * FROM wishlist WHERE user_id=$1 AND album_id=$2';
    return pool.query(query, values)
      .then((result) => {
        if (result.rows[0] !== undefined) {
          return true;
        }
        return false;
      });
  },
};
