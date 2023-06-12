const router = require('express').Router();
const controller = require('../controllers/trading-platform');

router.get('/:album_id/open-trades', controller.getActiveTrades);

module.exports = router;
