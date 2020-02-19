const express = require('express');
const router = express.Router();

const bookController = require('../controllers/book');

router.get('/', bookController.getAll);
router.get('/pinned', bookController.getPinned);

module.exports = router;
