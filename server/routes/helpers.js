const router = require('express').Router();
const helpers = require('../helpers');

router.get('/allAlbums', helpers.getAlbums);
router.get('/individualAlbum', helpers.getAlbumInfo);
router.get('/searchAlbumCategory', helpers.searchAlbumCategory);

module.exports = router;
