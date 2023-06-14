const router = require('express').Router();
const controller = require('../controllers/messages');

router.get('/rooms', controller.getRooms);
router.get('/', controller.getMessages);
router.post('/', controller.sendMessage);

module.exports = router;
