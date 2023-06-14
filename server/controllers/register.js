const models = require('../models/register');

const controllers = {};
controllers.registerUser = (req, res) => {
  const { uid } = req.body;
  const { username } = req.body;
  const { email } = req.body;
  //console.log('received', {uid, username, email} )
  models
    .addUser(uid, username, email)
    .then(() => {
      res.sendStatus(200);
    })
    .catch((err) => {
      console.error(err.message);
      res.status(500).send(err.message);
    });
};

module.exports = controllers;
