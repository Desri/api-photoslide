const express = require('express');
const albumController = require('../controllers/albumController');
const { identifier } = require('../middlewares/identification');
const router = express.Router();

router.post('/create-album', identifier, albumController.createAlbums)

module.exports = router;
