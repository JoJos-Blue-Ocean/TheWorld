const router = require('express').Router();
const controller = require('../controllers/messages');

router.get('/', controller.getAllMessages);
router.post('/', controller.sendMessage);

module.exports = router;
