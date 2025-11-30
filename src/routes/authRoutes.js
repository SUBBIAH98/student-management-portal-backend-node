const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { validateLogin } = require("../validations/authValidation");

/**
 * POST /api/auth/login
 * Login for admin/staff
 */
router.post('/login', validateLogin, authController.login);

module.exports = router;
