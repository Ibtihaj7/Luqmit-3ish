const express = require('express');
const authController = require('../controllers/Login');
const router = express.Router();

router.post('/signin',authController.Login);

module.exports = router;