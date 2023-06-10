require('dotenv').config();
const axios = require('axios');

const consumer_key = process.env.discog_consumer_key;
const consumer_secret = process.env.discog_consumer_secret;

module.exports = {
  getAlbums: (req, res) => {
    axios.get(`https://api.discogs.com/database/search?q=${req.query.text}&key=${consumer_key}&secret=${consumer_secret}&genre=${req.query.genre}&page=1&per_page=10`)
      .then((response) => {
        res.send(response.data);
      })
      .catch((err) => {
        console.log(err);
        res.sendStatus(500);
      });
  },
};
