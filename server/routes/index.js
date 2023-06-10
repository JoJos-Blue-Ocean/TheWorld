const route = require('express').Router();
const controllers = require('../controllers');
const helpers = require('../helpers');

route.get('', helpers.getAlbums);

module.exports = route;
