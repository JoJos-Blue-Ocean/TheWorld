const models = require('../models/wishlist');

module.exports = {

  getWishList(req, res) {
    models.getWishList(req.query.user_id).then((response) => {
      res.json(response);
    }).catch((err) => {
      console.log('Error in db when getting wishlist', err);
      res.sendStatus(500);
    });
  },
  removeFromWishList(req, res) {
    models.removeFromWishList(req.body).then((response) => {
      console.log('response', response);
      res.sendStatus(202);
    }).catch((err) => {
      console.log('Error in db when getting wishlist', err);
      res.sendStatus(500);
    });
  },
  addWishlist(req, res) {
    models.addWishlist(req.body)
      .then((response) => {
        res.send(response);
      })
      .catch((err) => {
        console.log(err);
        res.sendStatus(500);
      });
  },
};
