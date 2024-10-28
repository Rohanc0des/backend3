const mongoose = require('mongoose');

const doctorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  specialization: { type: String, required: true },
  availability: [{
    day: String,
    slots: [{ startTime: String, endTime: String }],
  }],
  createdAt: { type: Date, default: Date.now },
});

doctorSchema.index({ name: 'text', specialization: 'text' });
module.exports = mongoose.model('Doctor', doctorSchema);
