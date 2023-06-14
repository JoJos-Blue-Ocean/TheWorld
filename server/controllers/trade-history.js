const models = require('../models/trade-history');

module.exports = {
  getListedTrades(req, res) {
    const userId = req.query.user_id;
    models
      .getListedTrades(userId)
      .then((results) => res.json(results));
  },
  getCompleteTrades(req, res) {
    const userId = req.query.user_id;
    models
      .getCompleteTrades(userId)
      .then((results) => res.json(results));
  },
};
