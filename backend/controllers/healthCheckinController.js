const HealthCheckin = require('../models/healthCheckinModel');

exports.createCheckin = async (req, res) => {
  try {
    const { moodRating, stressLevel, feelings } = req.body;
    const userId = req.user._id;

    const checkin = await HealthCheckin.create({ userId, moodRating, stressLevel, feelings });
    res.status(201).json({ success: true, data: checkin });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getCheckinsByUser = async (req, res) => {
  try {
    const userId = req.user._id;

    const checkins = await HealthCheckin.find({ userId }).sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: checkins });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
