const express = require('express');
const router = express.Router();
const { login, getMe, getDemoUsers } = require('../controllers/authController');
const { verifyToken } = require('../middleware/auth');

router.post('/login', login);
router.get('/me', verifyToken, getMe);
router.get('/demo-users', getDemoUsers);

module.exports = router;
