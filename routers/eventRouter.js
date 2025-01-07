const express = require('express');
const eventController = require('../controllers/eventController');
const { identifier } = require('../middlewares/identification');
const router = express.Router();

router.get('/list', identifier, eventController.listEvent);
router.post('/create-event', identifier, eventController.createEvent);

module.exports = router;
