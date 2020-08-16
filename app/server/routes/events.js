const express = require('express');
const router = express.Router();

const eventController = require('../controllers/events');
const authMiddleware = require('../middlewares/auth');
const multer = require('../utils/multer-config');

router.post(
	'/create',
	authMiddleware.isAuthenticated,
	multer.uploadFile,
	eventController.create
);
router.get('/:id', eventController.showById);
router.post('/api', eventController.showByQuery);
router.post('/:id', eventController.jsonById);

router.put(
	'/:id/update',
	authMiddleware.isAuthenticated,
	multer.uploadFile,
	eventController.updateById
);

router.delete(
	'/:id/delete',
	authMiddleware.isAuthenticated,
	eventController.delete
);

router.get('/', eventController.getIndex);

module.exports = router;
