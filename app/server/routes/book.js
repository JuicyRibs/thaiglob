const express = require('express');
const router = express.Router();
const multer = require('../utils/multer-config');

const bookController = require('../controllers/book');

router.get('/publication/:page?', bookController.getBooksPage);
router.post('/publication/', multer.uploadDocument, bookController.create);

module.exports = router;
