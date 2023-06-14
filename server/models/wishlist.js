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
};
