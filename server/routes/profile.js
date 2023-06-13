const router = require('express').Router();
const controller = require('../controllers/profile');

router.get('/:user_id', controller.getProfile);

module.exports = router;
