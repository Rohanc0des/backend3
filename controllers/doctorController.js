const Doctor = require('../models/mongodb/Doctor');

const doctorController = {
  create: async (req, res) => {
    try {
      const doctor = new Doctor(req.body);
      await doctor.save();
      res.status(201).json(doctor);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  update: async (req, res) => {
    try {
      const doctor = await Doctor.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!doctor) {
        return res.status(404).json({ message: 'Doctor not found' });
      }
      res.json(doctor);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  delete: async (req, res) => {
    try {
      const doctor = await Doctor.findByIdAndDelete(req.params.id);
      if (!doctor) {
        return res.status(404).json({ message: 'Doctor not found' });
      }
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  list: async (req, res) => {
    try {
      const doctors = await Doctor.find();
      res.json(doctors);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
};

module.exports = doctorController;
