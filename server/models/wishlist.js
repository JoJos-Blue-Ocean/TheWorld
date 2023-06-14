const pool = require('../database/db');

module.exports = {

  getWishList(userid) {
    const wishListQuery = {
      text: `SELECT user_id, artist_name, album_name, genre, image FROM wishlist
      WHERE user_id =$1`,
      values: [userid],
    };
    return pool.query(wishListQuery).then((results) => results.rows).catch((err) => console.log('cannot get wishlist data from db', err));
  },
  addWishlist(request) {
    console.log(request);
    const values = [request.user_id,
      request.artist_name, request.album_name, request.genre, request.image];
    const query = 'INSERT INTO wishlist (user_id, artist_name, album_name, genre, image) VALUES ($1, $2, $3, $4, $5)';
    return pool.query(query, values);
  },
};
