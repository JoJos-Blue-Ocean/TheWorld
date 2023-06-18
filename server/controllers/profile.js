const models = require('../models/profile');

module.exports = {
  getProfile(req, res) {
    console.log('REQ PARAMS', req.params);
    const user = req.params.user_id;
    models.getProfile(user)
      .then((results) => {
        console.log('PROFILE RESULTS', results);
        res.json(results);
      });
  },
  updateProfile(req, res) {
    const { user } = req.body;
    models.updateProfile(user)
      .then((results) => res.json(results));
  },
  getSimpleProfile(req, res) {
    const { selectedUserId, personalId } = req.query;
    models
      .getSimpleProfile(selectedUserId, personalId)
      .then((results) => res.json(results));
  },
  getSingleUser(req, res) {
    const { userId } = req.query;
    models
      .getSingleUser(userId)
      .then((results) => res.json(results));
  },
};
