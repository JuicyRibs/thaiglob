const express = require('express');
const router = express.Router();

const authController = require('../controllers/auth');
const authMiddleware = require('../middlewares/auth');

router.get(
	'/login',
	authMiddleware.isNotAuthenticated,
	authController.getLogin
);

router.post('/login', authController.postLogin);

router.post('/logout', authController.postLogout);

module.exports = router;
