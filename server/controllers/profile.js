const models = require('../models/profile');

module.exports = {
  getProfile(req, res) {
    const user = req.params.user_id;
    models.getProfile(user)
      .then((results) => res.json(results));
  },
  updateProfile(req, res) {
    const user = req.body.user;
    models.updateProfile(user)
      .then((results) => res.json(results));
  },
};
