const router = require('express').Router();
const controller = require('../controllers/register');

router.post('/', controller.registerUser);

module.exports = router;
