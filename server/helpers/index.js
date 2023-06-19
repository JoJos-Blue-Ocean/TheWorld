require('dotenv').config();
const axios = require('axios');

const consumerKey = process.env.DISCOGS_CONSUMER_KEY;
const consumerSecret = process.env.DISCOGS_CONSUMER_SECRET;
const token = process.env.DISCOGS_TOKEN;

module.exports = {
  getAlbums: (req, res) => {
    axios.get(`https://api.discogs.com/database/search?q=&type=release${req.query.text}&genre=${req.query.genre}&key=${consumerKey}&secret=${consumerSecret}&page=${req.query.page}&per_page=10`)
      .then((response) => {
        res.send(response.data);
      })
      .catch((err) => {
        console.log(err);
        res.sendStatus(500);
      });
  },
  getAlbumInfo: (req, res) => {
    console.log(req.query.id);
    axios.get(`https://api.discogs.com/masters/${req.query.id}?token=${token}`)
      .then((response) => {
        res.send(response.data);
      })
      .catch((err) => {
        console.log(err);
        res.sendStatus(500);
      });
  },
  searchAlbumCategory: (req, res) => {
    axios.get(`https://api.discogs.com/database/search?q=&type=master&${req.query.category}=${req.query.search}&key=${consumerKey}&secret=${consumerSecret}&page=${req.query.page}&per_page=10`)
      .then((response) => {
        res.send(response.data);
      })
      .catch((err) => {
        console.log(err);
        res.sendStatus(500);
      });
  },
};
