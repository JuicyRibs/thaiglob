const express = require('express');
const router = express.Router();

const researchController = require('../controllers/research');

router.get('/research/:page?', researchController.getResearchPage);
router.post('/research/', researchController.create);

module.exports = router;
