const router = require('express').Router();
const controller = require('../controllers/trade-history');

router.get('/listed-trades', controller.getListedTrades);
router.get('/complete-trades', controller.getCompleteTrades);

module.exports = router;
