const express = require('express');
const router = express.Router();
const dashboardController = require('../controllers/dashboardController');
const { authenticateToken, authorizedRoles } = require('../middleware/authMiddleware');

// /api/dashboard/summary
router.get('/summary', authenticateToken, authorizedRoles('admin', 'staff'), dashboardController.getDashboardSummary);

module.exports = router;
