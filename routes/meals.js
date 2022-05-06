const express = require('express');
const authController = require('../controllers/meals');
const router = express.Router();

router.post('/m1',authController.m1);
router.post('/m2',authController.m2);
router.post('/m3',authController.m3);
router.post('/m4',authController.m4);
router.post('/m5',authController.m5);
router.post('/m6',authController.m6);

module.exports = router;