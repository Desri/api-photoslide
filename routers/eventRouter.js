const express = require('express');
const multer = require("multer");
const eventController = require('../controllers/eventController');
const { identifier } = require('../middlewares/identification');
const router = express.Router();

// Konfigurasi Multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "uploads/");
    },
    filename: (req, file, cb) => {
      const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
      cb(null, `${uniqueSuffix}-${file.originalname}`);
    },
});
  
const upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        if (file.mimetype.startsWith("image/")) {
        cb(null, true);
        } else {
        cb(new Error("Only image files are allowed!"));
        }
    },
});

router.get('/list', identifier, eventController.listEvent);
router.post('/create-event', identifier, eventController.createEvent);
router.get('/:slug', identifier, eventController.detailEvent)
router.put('/slideshow-event', identifier, eventController.slideshowEvent)
router.put('/moderation', identifier, eventController.moderationEvent)

router.put('/appearance', upload.single('image'), identifier, eventController.appearanceEvent)

router.put('/welcome-screen', identifier, eventController.welcomeScreen)
router.put('/general', identifier, eventController.generalEvent)

module.exports = router;
