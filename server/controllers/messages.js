const models = require('../models/messages');

module.exports = {
  getAllMessages(req, res) {
    const { userId } = req.params;
    models
      .getAllMessages(userId)
      .then((results) => res.json(results));
  },
  sendMessage(req, res) {
    const { senderId, recipientId, body } = req.params;
    models
      .sendMessage(senderId, recipientId, body)
      .then(() => res.sendStatus(201));
  },
};
