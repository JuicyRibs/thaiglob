const express = require('express');
const router = express.Router();

const researchController = require('../controllers/research');

router.get('/researches/:page?', researchController.getResearchPage);
router.post('/researches/', researchController.create);

module.exports = router;
