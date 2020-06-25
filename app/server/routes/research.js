const express = require('express');
const router = express.Router();

const authMiddleware = require('../middlewares/auth');
const researchController = require('../controllers/research');
const multer = require('../utils/multer-config');

router.post(
	'/create',
	authMiddleware.isAuthenticated,
	multer.uploadFile,
	researchController.create
);

router.put(
	'/:id/update',
	authMiddleware.isAuthenticated,
	multer.uploadFile,
	researchController.updateById
);

router.delete(
	'/:id/delete',
	authMiddleware.isAuthenticated,
	researchController.delete
);

router.get('/', researchController.getIndex);

module.exports = router;
