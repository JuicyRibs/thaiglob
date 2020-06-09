const express = require('express');
const router = express.Router();

const authMiddleware = require('../middlewares/auth');
const researchController = require('../controllers/research');
const multer = require('../utils/multer-config');

router.get('/', researchController.getResearchPage);
router.post('/', researchController.create);
router.delete(
	'/:id/delete',
	authMiddleware.isAuthenticated,
	researchController.delete
);

module.exports = router;
