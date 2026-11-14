const express = require('express');
const router = express.Router();
const { getAdminMetrics } = require('../controllers/dashboardController');

router.get('/admin-metrics', getAdminMetrics);

module.exports = router;
