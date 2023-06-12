const pool = require('../database/db');

module.exports = {
  getActiveTrades(albumId) {
    const query = 'SELECT * FROM trades WHERE have_album_id=$1 AND status=$2';
    const values = [albumId, 'open'];
    return pool
      .query(query, values)
      .then((results) => results.rows);
  },
};
