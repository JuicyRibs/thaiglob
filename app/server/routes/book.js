const express = require('express');
const router = express.Router();

const bookController = require('../controllers/book');

router.get('/books/:page?', bookController.getBooksPage);
router.post('/books/', bookController.create);

module.exports = router;
