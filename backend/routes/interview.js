const express = require('express');
const router = express.Router();
const interviewController = require('../controller/interviewController');

router.post('/generate', interviewController.generateQuestions);
router.post('/feedback', interviewController.evaluateAnswer);

module.exports = router;