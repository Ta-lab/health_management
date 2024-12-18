const express = require('express');
const router = express.Router();
const healthCheckinController = require('../controllers/healthCheckinController');
const { protect } = require('../middlewares/authMiddleware');

router.post('/', protect, healthCheckinController.createCheckin);
router.get('/', protect, healthCheckinController.getCheckinsByUser);

module.exports = router;
