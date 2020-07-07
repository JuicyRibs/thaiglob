const express = require('express');
const router = express.Router();
const adminController = require('../controllers/admin');
const authMiddleware = require('../middlewares/auth');
// INDEX
router.get('/', authMiddleware.isAuthenticated, adminController.getIndex);

// ARTICLE
router.get(
	'/article',
	authMiddleware.isAuthenticated,
	adminController.getArticle
);
router.get(
	'/article/:id/edit',
	authMiddleware.isAuthenticated,
	adminController.editArticle
);
// EVENT
router.get('/event', authMiddleware.isAuthenticated, adminController.getEvent);
router.get(
	'/event/:id/edit',
	authMiddleware.isAuthenticated,
	adminController.editEvent
);
// BOOKS
router.get(
	'/book',
	authMiddleware.isAuthenticated,
	adminController.getPublication
);
// MEDIA
router.get(
	'/media',
	authMiddleware.isAuthenticated,
	adminController.getMultimedia
);
router.get(
	'/media/:id/edit',
	authMiddleware.isAuthenticated,
	adminController.editMultimedia
);
// NEWS
router.get('/news', authMiddleware.isAuthenticated, adminController.getNews);
// RESEARCH
router.get(
	'/research',
	authMiddleware.isAuthenticated,
	adminController.getResearch
);

module.exports = router;
