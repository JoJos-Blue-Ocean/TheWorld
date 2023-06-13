const pool = require('../database/db');

module.exports = {
  addWishlist: (request) => {
    const values = [request.user_id, request.album_id,
      request.artist_name, request.album_name, request.genre, request.image];
    const query = 'INSERT INTO wishlist (user_id, album_id, artist_name, album_name, genre, image) VALUES ($1, $2, $3, $4, $5, $6)';
    return pool.query(query, values);
  },
  checkWishlist: (request) => {
    request.user_id, request.album_id;
  }
};
