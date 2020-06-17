const express = require('express');
const router = express.Router();
const multer = require('../utils/multer-config');

const authMiddleware = require('../middlewares/auth');
const bookController = require('../controllers/book');

router.get('/', bookController.getIndex);
router.post('/api', bookController.showByQuery);
router.post(
	'/',
	authMiddleware.isAuthenticated,
	multer.uploadFile,
	bookController.create
);

module.exports = router;
