const express = require('express');
const contactController = require('../controllers/contactUs');
const router = express.Router();

router.post('/contact',contactController.contactUs);

module.exports = router;