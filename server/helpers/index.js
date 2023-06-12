require('dotenv').config();
const axios = require('axios');
// const Discogs = require('disconnect').Client;

const consumerKey = 'ZvHBoFkrLyXPIeKeOXNT';
const consumerSecret = 'hxwocTTpjbwSyqxpzxmPrOvCskCxiPrF';
const token = 'mrsOtFtkMeCRTyFvAFJFPoxRPcCXUMKmICIkypqC';

// const dis = new Discogs({
//   consumerKey,
//   consumerSecret,
// });

module.exports = {

  //  master id
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
  // getReleaseInfo: (req, res) => {
  //   axios.get(`https://api.discogs.com/releases/${response.data.main_release}?token=${token}`)
  //     .then((result) => {
  //       res.send(result.data);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //       res.sendStatus(500);
  //     });
  // },
};
