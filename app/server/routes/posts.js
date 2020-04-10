const express = require('express');
const router = express.Router();

const postController = require('../controllers/post');

router.get('/news/:page?', postController.getNewsPage);
router.get('/articles/:page?', postController.getArticlesPage);
router.get('/events/:page?', postController.getEventsPage);
router.get('/post/:id', postController.getPost);
router.get('/', postController.getIndex);

router.post('/post/', postController.create);

module.exports = router;
