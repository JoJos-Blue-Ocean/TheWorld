const router = require('express').Router();
const controller = require('../controllers/wishlist');

router.get('/', controller.getWishList);
router.post('/add', controller.addWishlist);
router.get('/check', controller.checkWishlist);

module.exports = router;
