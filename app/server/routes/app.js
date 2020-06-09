const express = require('express');
const router = express.Router();

const indexController = require('../controllers/index');
const multer = require('../utils/multer-config');

router.get('/', indexController.getIndex);
router.get('/about', indexController.getAbout);
router.get('/knowledge-corner', indexController.getCorner);
router.get('/contact', indexController.getContact);
router.get('/media', indexController.getMedia);
router.get('/research-issues', indexController.getIssues);
router.get('/upload/:fileName', indexController.getFile);
router.post(
	'/upload/quill/:fileName',
	multer.uploadFile,
	indexController.postQuill
);

module.exports = router;
