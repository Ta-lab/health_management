const mongoose = require('mongoose');

const healthCheckinSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  moodRating: {
    type: Number,
    min: 1,
    max: 10,
    required: true,
  },
  stressLevel: {
    type: String,
    required: true,
  },
  feelings: {
    type: String,
    required: true,
  },
}, { timestamps: true });

const HealthCheckin = mongoose.model('HealthCheckin', healthCheckinSchema);

module.exports = HealthCheckin;
