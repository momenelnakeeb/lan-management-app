const express = require('express');
const { register, login, getProfile, updateProfile, deleteProfile } = require('../controllers/authController');
const { protect, admin } = require('../middlewares/authMiddleware');
const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/profile', protect, getProfile);
router.put('/profile/:id', protect, updateProfile);
router.delete('/profile/:id', protect, deleteProfile);

module.exports = router;
