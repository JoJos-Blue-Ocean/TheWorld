const router = require('express').Router();
const controller = require('../controllers/wishlist');

router.post('', controller.addWishlist);

module.exports = router;
