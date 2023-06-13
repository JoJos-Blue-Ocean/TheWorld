const models = require('../models/wishlist');

module.exports = {
  addWishlist: (req, res) => {
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
