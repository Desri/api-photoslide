const express = require('express');
const eventController = require('../controllers/eventController');
const { identifier } = require('../middlewares/identification');
const router = express.Router();

router.get('/list', identifier, eventController.listEvent);
router.post('/create-event', identifier, eventController.createEvent);
router.get('/:slug', identifier, eventController.detailEvent)
router.put('/slideshow-event', identifier, eventController.slideshowEvent)
router.put('/moderation', identifier, eventController.moderationEvent)
router.put('/appearance', identifier, eventController.appearanceEvent)
router.post('/upload-image', identifier, eventController.uploadImage)
router.put('/welcome-screen', identifier, eventController.welcomeScreen)
router.put('/general', identifier, eventController.generalEvent)

module.exports = router;
