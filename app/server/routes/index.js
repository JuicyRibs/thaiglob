const express = require('express');
const router = express.Router();

const indexController = require('../controllers/index');

router.get('/', indexController.getIndex);
router.get('/about', indexController.getAbout);
router.get('/update', indexController.getUpdates);
router.get('/contact', indexController.getContact);
router.get('/media', indexController.getMedia);

module.exports = router;
