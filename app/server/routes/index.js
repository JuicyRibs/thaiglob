const express = require('express');
const router = express.Router();

const indexController = require('../controllers/index');

router.get('/', indexController.getIndex);
router.get('/news', indexController.getNews);
router.get('/articles', indexController.getArticles);
router.get('/events', indexController.getEvents);
router.get('/books', indexController.getBooks);
router.get('/books', indexController.getBooks);
router.get('/researches', indexController.getResearches);
router.get('/about', indexController.getAbout);
router.get('/update', indexController.getUpdates);
router.get('/contact', indexController.getContact);
router.get('/post', indexController.getPost);

module.exports = router;
