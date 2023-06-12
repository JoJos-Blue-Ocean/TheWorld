const router = require('express').Router();
const helpers = require('../helpers');

router.get('', helpers.getAlbums);

module.exports = router;
