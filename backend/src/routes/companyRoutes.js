const express = require('express');
const companyController = require('../controllers/companyController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/profile', authMiddleware, companyController.getProfile);
router.post('/register', authMiddleware, companyController.registerProfile);
router.put('/profile', authMiddleware, companyController.updateProfile);

module.exports = router;
