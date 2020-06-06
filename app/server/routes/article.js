const express = require('express');
const router = express.Router();

const articleController = require('../controllers/article');
const authMiddleware = require('../middlewares/auth');

router.post(
	'/create',
	authMiddleware.isAuthenticated,
	articleController.create
);
router.get('/:id', articleController.showById);
router.post('/api', articleController.showByQuery);

router.put(
	'/:id/update',
	authMiddleware.isAuthenticated,
	articleController.updateById
);

router.delete(
	'/:id/delete',
	authMiddleware.isAuthenticated,
	articleController.delete
);
