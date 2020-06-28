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
router.get('/event', authMiddleware.isAuthenticated, adminController.getEvent);
router.get(
	'/book',
	authMiddleware.isAuthenticated,
	adminController.getPublication
);

module.exports = router;
