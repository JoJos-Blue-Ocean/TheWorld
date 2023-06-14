const router = require('express').Router();
const controller = require('../controllers/wishlist');

console.log('I am in router wishlist', controller);
router.get('/', controller.getWishList);

module.exports = router;
