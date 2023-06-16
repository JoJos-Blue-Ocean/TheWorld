const cloudinary = require('cloudinary').v2;
const models = require('../models/profile');

cloudinary.config({
  cloud_name: 'dobtby3cm',
  api_key: '666657323527964',
  api_secret: 'UAXZbxd6ZKS8P68ehC-tFnu-2KE',
});

async function uploadPfp(file) {
  console.log('BEFORE SENDING TO CLOUDINARY');
  const res = await cloudinary.uploader.upload(file, {
    resource_type: 'auto',
  });
  console.log('THIS IS FROM UPLOADPFP', res);
  return res;
}

module.exports = {
  async updatePfp(req, res) {
    const user = req.params;
    console.log('FILE HERE **************: ', req.file);
    try {
      const b64 = Buffer.from(req.file.buffer).toString('base64');
      // eslint-disable-next-line prefer-template
      const dataURI = 'data:' + req.file.mimetype + ';base64,' + b64;
      const cldRes = await uploadPfp(dataURI);
      const url = cldRes.secure_url;
      user.profile_picture = url;
      console.log('THIS IS USER: ', user);
      models.updatePfp(user)
        .then((results) => res.json(results));
    } catch (err) {
      console.log('ERROR');
      res.send({ message: err.message });
    }
  },
};
