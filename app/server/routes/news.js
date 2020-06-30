const express = require('express');
const router = express.Router();

const newsController = require('../controllers/news');
const authMiddleware = require('../middlewares/auth');
const multer = require('../utils/multer-config');

router.post(
	'/create',
	authMiddleware.isAuthenticated,
	multer.uploadFile,
	newsController.create
);
router.get('/:id', newsController.showById);
router.post('/api', newsController.showByQuery);

router.put(
	'/:id/update',
	authMiddleware.isAuthenticated,
	multer.uploadFile,
	newsController.updateById
);

router.delete(
	'/:id/delete',
	authMiddleware.isAuthenticated,
	newsController.delete
);

router.get('/', newsController.getIndex);

module.exports = router;
