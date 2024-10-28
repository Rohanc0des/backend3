const Appointment = require('../models/mongodb/Appointment');
const Doctor = require('../models/mongodb/Doctor');

const appointmentController = {
  create: async (req, res) => {
    try {
      const { doctorId, dateTime } = req.body;

      const existingAppointment = await Appointment.findOne({
        doctorId,
        dateTime: new Date(dateTime),
        status: { $in: ['pending', 'approved'] },
      });

      if (existingAppointment) {
        return res.status(400).json({ message: 'Time slot not available' });
      }

      const appointment = new Appointment({ patientId: req.user.id, doctorId, dateTime });
      await appointment.save();
      res.status(201).json(appointment);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
};

module.exports = appointmentController;
