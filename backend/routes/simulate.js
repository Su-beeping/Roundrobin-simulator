const express = require('express');
const router = express.Router();
const { simulate, healthCheck } = require('../controllers/simulateController');
router.post('/simulate', simulate);
router.get('/health', healthCheck);
module.exports = router;