const express = require('express');
const router = express.Router();

const multimediaController = require('../controllers/multimedia');
const authMiddleware = require('../middlewares/auth');
const multer = require('../utils/multer-config');

router.post(
	'/create',
	authMiddleware.isAuthenticated,
	multer.uploadFile,
	multimediaController.create
);
router.get('/:id', multimediaController.showById);
router.post('/api', multimediaController.showByQuery);

router.put(
	'/:id/update',
	authMiddleware.isAuthenticated,
	multimediaController.updateById
);

router.delete(
	'/:id/delete',
	authMiddleware.isAuthenticated,
	multimediaController.delete
);

router.get('/', multimediaController.getIndex);

module.exports = router;
