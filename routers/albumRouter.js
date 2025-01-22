const express = require('express');
const albumController = require('../controllers/albumController');
const { identifier } = require('../middlewares/identification');
const router = express.Router();

router.post('/create-album', identifier, albumController.createAlbums)
router.get('/:slug', identifier, albumController.listAlbums)
router.delete('/remove', identifier, albumController.removeAlbums)

module.exports = router;
