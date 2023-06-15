const models = require('../models/messages');

module.exports = {
  getRooms(req, res) {
    const { userId } = req.query;
    models
      .getRooms(userId)
      .then((results) => res.json(results));
  },
  getMessages(req, res) {
    const { roomId } = req.query;
    models
      .getMessages(roomId)
      .then((results) => res.json(results));
  },
  sendMessage(req, res) {
    const { roomId, senderId, body } = req.body;
    models
      .sendMessage(roomId, senderId, body)
      .then((results) => res.json(results));
  },
  sendFirstMessage(req, res) {
    const { senderId, recipientId, body } = req.body;
    models
      .sendFirstMessage(senderId, recipientId, body)
      .then((results) => res.json(results));
  },
};
