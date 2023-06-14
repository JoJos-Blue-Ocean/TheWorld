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
    console.log('req for remove in model', req.id, req.user_id);
    const wishListQuery = {
      text: `DELETE FROM wishlist
      WHERE id =$1 AND user_id=$2`,
      values: [req.id, req.user_id],
    };
    return pool.query(wishListQuery).then((results) => results.rows).catch((err) => console.log('cannot get wishlist data from db', err));
  },
  addWishlist(request) {
    // console.log(request);
    const values = [request.user_id, request.album_id,
      request.artist_name, request.album_name, request.genre, request.image];
    const query = 'INSERT INTO wishlist (user_id, album_id, artist_name, album_name, genre, image) VALUES ($1, $2, $3, $4, $5, $6)';
    return pool.query(query, values);
  },
};
