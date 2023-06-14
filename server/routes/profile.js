const router = require('express').Router();
const controller = require('../controllers/profile');

router.get('/simpleProfile', controller.getSimpleProfile);
// router.get('/simpleProfile', (req, res) => {
//   console.log('INSIDE ROUTES');
//   res.json('INSIDE ROUTES');
// });
router.get('/:user_id', controller.getProfile);
router.put('/:user_id', controller.updateProfile);

module.exports = router;
