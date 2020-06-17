const express = require('express');
const router = express.Router();
const adminController = require('../controllers/admin');
const authMiddleware = require('../middlewares/auth');

router.get('/', authMiddleware.isAuthenticated, adminController.getIndex);
router.get(
	'/article',
	authMiddleware.isAuthenticated,
	adminController.getArticle
);

module.exports = router;
