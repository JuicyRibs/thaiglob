const express = require('express');
const router = express.Router();

const articleController = require('../controllers/article');
const authMiddleware = require('../middlewares/auth');
const multer = require('../utils/multer-config');

router.post(
	'/create',
	authMiddleware.isAuthenticated,
	multer.uploadFile,
	articleController.create
);
router.get('/:id', articleController.showById);
router.post('/api', articleController.showByQuery);
router.post('/:id', articleController.jsonById);

router.put(
	'/:id/update',
	authMiddleware.isAuthenticated,
	multer.uploadFile,
	articleController.updateById
);

router.delete(
	'/:id/delete',
	authMiddleware.isAuthenticated,
	articleController.delete
);

router.get('/', articleController.getIndex);

module.exports = router;
