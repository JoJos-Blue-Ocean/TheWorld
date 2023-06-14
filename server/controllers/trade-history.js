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
  insertListedTrade(req, res) {
    const userId = req.body.user_id;
    const haveAlbumId = req.body.have_album_id;
    const wantAlbumId = req.body.want_album_id;
    const { description } = req.body;
    models
      .insertListedTrade(userId, haveAlbumId, wantAlbumId, description)
      .then(() => res.sendStatus(201));
  },
  updateToComplete(req, res) {
    const { id } = req.body;
    const buyerId = req.body.buyer_id;
    models
      .updateToComplete(id, buyerId)
      .then(() => res.sendStatus(200));
  },
  insertRating(req, res) {
    const senderId = req.body.sender_id;
    const recipientId = req.body.recipient_id;
    const tradeId = req.body.trade_id;
    const { rating } = req.body;
    models
      .insertRating(senderId, recipientId, tradeId, rating)
      .then(() => res.sendStatus(201));
  },
};
