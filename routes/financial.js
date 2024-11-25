const express = require('express');
const router = express.Router();
const financialController = require('../controllers/financialController');

// Route to add a financial record
router.post('/financial-tools', financialController.addRecord);

// Route to get all financial records
router.get('/financial-tools', financialController.getAllRecords);

module.exports = router;
