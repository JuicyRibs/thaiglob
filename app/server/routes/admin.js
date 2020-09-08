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
router.get(
	'/book/:id/edit',
	authMiddleware.isAuthenticated,
	adminController.editPublication
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
router.get(
	'/news/:id/edit',
	authMiddleware.isAuthenticated,
	adminController.editNews
);
// RESEARCH
router.get(
	'/research',
	authMiddleware.isAuthenticated,
	adminController.getResearch
);
router.get(
	'/research/:id/edit',
	authMiddleware.isAuthenticated,
	adminController.editResearch
);
// CAROUSEL
router.get(
	'/carousel',
	authMiddleware.isAuthenticated,
	adminController.getCarousel
);

module.exports = router;
