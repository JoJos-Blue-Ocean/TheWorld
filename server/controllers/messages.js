const models = require('../models/messages');

module.exports = {
  getUsers(req, res) {
    const { userId } = req.query;
    models
      .getUsers(userId)
      .then((results) => res.json(results));
  },
  getMessages(req, res) {
    const { firstId, secondId } = req.query;
    models
      .getMessages(firstId, secondId)
      .then((results) => res.json(results));
  },
  sendMessage(req, res) {
    const { senderId, recipientId, body } = req.body;
    models
      .sendMessage(senderId, recipientId, body)
      .then(() => res.sendStatus(201));
  },
};
