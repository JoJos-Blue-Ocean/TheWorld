const router = require('express').Router();
const controller = require('../controllers/wishlist');

router.post('', controller.addWishlist);
router.get('', controller.checkWishlist);

module.exports = router;
