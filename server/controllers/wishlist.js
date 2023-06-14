const models = require('../models/wishlist');

console.log('I am in controller wishlist');

module.exports = {

  getWishList(req, res) {
    models.getWishList(req.query.user_id).then((response) => {
      res.json(response);
    }).catch((err) => {
      console.log('Error in db when getting wishlist', err);
    });
  },
};
