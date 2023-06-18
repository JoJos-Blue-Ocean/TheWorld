const pool = require('../database/db');

module.exports = {

  getWishList(userid) {
    const wishListQuery = {
      text: `SELECT id, user_id, artist_name, album_name, genre, image FROM wishlist
      WHERE user_id =$1`,
      values: [userid],
    };
    return pool.query(wishListQuery).then((results) => results.rows).catch((err) => console.log('cannot get wishlist data from db', err));
  },
  removeFromWishList(req) {
    const wishListQuery = {
      text: `DELETE FROM wishlist
      WHERE id =$1 AND user_id=$2`,
      values: [req.id, req.user_id],
    };
    return pool.query(wishListQuery).then((results) => results.rows).catch((err) => console.log('cannot remove wishlist data from db', err));
  },
  addWishlist(request) {
    const values = [request.user_id, request.album_id,
      request.artist_name, request.album_name, request.genre, request.image];
    const query = 'INSERT INTO wishlist (user_id, album_id, artist_name, album_name, genre, image) VALUES ($1, $2, $3, $4, $5, $6)';
    return pool.query(query, values);
  },
  checkWishlist(request) {
    const values = [request.user_id, request.album_id];
    const query = 'SELECT * FROM wishlist WHERE user_id=$1 AND album_id=$2';
    return pool.query(query, values)
      .then((result) => {
        console.log(result);
        if (result.rows[0] !== undefined) {
          return true;
        }
        return false;
      });
  },
};
