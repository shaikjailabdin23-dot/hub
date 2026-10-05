const express = require('express');
const router = express.Router();
const { getHubs, getHubById } = require('../controllers/hubController');

router.get('/', getHubs);
router.get('/:id', getHubById);

module.exports = router;
