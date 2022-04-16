const express = require('express');
const authController = require('../controllers/signUp');
const router = express.Router();

router.post('/register',authController.register);

module.exports = router;