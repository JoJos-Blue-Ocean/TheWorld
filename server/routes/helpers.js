const router = require('express').Router();
const helpers = require('../helpers');

console.log('is routes helpers.js running?');
router.get('', helpers.getAlbums);

module.exports = router;
