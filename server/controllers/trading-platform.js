const models = require('../models/trading-platform');

module.exports = {
  getActiveTrades(req, res) {
    const albumId = req.params.album_id;
    models
      .getActiveTrades(albumId)
      .then((results) => {
        console.log(results);
        res.json(results);
      });
  },
};
