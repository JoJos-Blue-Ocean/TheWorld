const router = require('express').Router();
const controller = require('../controllers/wishlist');

router.get('/', controller.getWishList);
router.post('', controller.addWishlist);

module.exports = router;
