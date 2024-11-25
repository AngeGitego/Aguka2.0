const express = require('express');
const router = express.Router();
const cropManagementController = require('../controllers/cropManagementController');

// Route to fetch crop details by crop name
router.get('/:crop', cropManagementController.getCropDetails);

module.exports = router;
