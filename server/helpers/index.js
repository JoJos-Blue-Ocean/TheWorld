require('dotenv').config();
const axios = require('axios');

const consumerKey = 'ZvHBoFkrLyXPIeKeOXNT';
const consumerSecret = 'hxwocTTpjbwSyqxpzxmPrOvCskCxiPrF';

module.exports = {
  getAlbums: (req, res) => {
    axios.get(`https://api.discogs.com/database/search?q=${req.query.text}&genre=${req.query.genre}&key=${consumerKey}&secret=${consumerSecret}&page=${req.query.page}&per_page=10`)
      .then((response) => {
        res.send(response.data);
      })
      .catch((err) => {
        console.log(err);
        res.sendStatus(500);
      });
  },
  getAlbumInfo: (req, res) => {
    console.log(req.query.release_id);
    axios.get(`https://api.discogs.com/releases/${req.query.release_id}`)
      .then((response) => {
        res.send(response.data);
      })
      .catch((err) => {
        console.log(err);
        res.sendStatus(500);
      });
  },
};
