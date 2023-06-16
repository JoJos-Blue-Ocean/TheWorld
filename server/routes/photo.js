const router = require('express').Router();
const controller = require('../controllers/photo');
const Multer = require('multer');
const storage = new Multer.memoryStorage();
const upload = Multer({ storage });

router.post('/:user_id/upload', upload.single('file'), controller.updatePfp);

module.exports = router;
