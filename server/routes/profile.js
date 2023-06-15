const router = require('express').Router();
const controller = require('../controllers/profile');

router.get('/simpleProfile', controller.getSimpleProfile);
router.get('/getSingleUser', controller.getSingleUser);
router.get('/:user_id', controller.getProfile);
router.put('/:user_id', controller.updateProfile);

module.exports = router;
