const pool = require('../database/db');

module.exports = {

  getWishList(userid) {
    const wishListQuery = {
      text: `SELECT user_id, artist_name, album_name, genre, image FROM wishlist
      WHERE user_id =$1`,
      values: [userid],
    };
    return pool.query(wishListQuery).catch((err) => console.log('cannot get wishlist data from db', err));
  },
};
