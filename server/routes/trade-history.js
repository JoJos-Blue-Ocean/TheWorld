const router = require('express').Router();
const controller = require('../controllers/trade-history');

router.get('/listed-trades', controller.getListedTrades);
router.get('/complete-trades', controller.getCompleteTrades);
router.post('/add-trade', controller.insertListedTrade);
router.put('/complete-trade', controller.updateToComplete);
router.post('/add-rating', controller.insertRating);
router.get('/get-users', controller.getUsers);

module.exports = router;
