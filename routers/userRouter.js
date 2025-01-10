const express = require('express');
const userController = require('../controllers/userController');
const { identifier } = require('../middlewares/identification');
const router = express.Router();

router.get('/profile', identifier, userController.getProfile);
router.post('/add-plan', identifier, userController.fetchAddPlan);

module.exports = router;
