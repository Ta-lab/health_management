const express = require('express');
const { registerUser, loginUser, getDashboard } = require('../controllers/authController');
// const { protect } = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
// router.get('/dashboard', protect, getDashboard);

module.exports = router;
