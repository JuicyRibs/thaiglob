const express = require('express');
const router = express.Router();

const bookController = require('../controllers/book');

router.get('/publication/:page?', bookController.getBooksPage);
router.post('/publication/', bookController.create);

module.exports = router;
