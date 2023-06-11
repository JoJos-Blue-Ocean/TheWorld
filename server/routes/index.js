const route = require('express').Router();
const controllers = require('../controllers');
const helpers = require('../helpers');

route.get('', helpers.getAlbums);
route.get('/individualAlbum', helpers.getAlbumInfo);

module.exports = route;
