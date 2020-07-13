const express = require('express');
const router = express.Router();

const carouselController = require('../controllers/carousel');
const authMiddleware = require('../middlewares/auth');
const multer = require('../utils/multer-config');

router.post(
	'/create',
	authMiddleware.isAuthenticated,
	multer.uploadFile,
	carouselController.create
);
router.get('/api', carouselController.showAll);

router.delete(
	'/:id/delete',
	authMiddleware.isAuthenticated,
	carouselController.delete
);

module.exports = router;
