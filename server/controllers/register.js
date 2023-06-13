const models = require('../models/register');

const controllers = {};
controllers.registerUser = (req, res) => {
  const { uid } = req;
  const { username } = req;
  const { email } = req;
  models
    .addUser(uid, username, email)
    .then(() => {
      res.sendStatus(200);
    })
    .catch((err) => {
      console.error(err.message);
    });
};

module.exports = controllers;
