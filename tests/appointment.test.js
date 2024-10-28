const request = require('supertest');
const app = require('../server'); // Adjust this if necessary
const mongoose = require('mongoose');
const { connectMongo } = require('../config/database');
const Appointment = require('../models/mongodb/Appointment');
const User = require('../models/sql/User');
const jwt = require('jsonwebtoken');

describe('Appointment API', () => {
  let token;
  let adminToken;

  beforeAll(async () => {
    await connectMongo();

    const user = await User.create({
      email: 'test@example.com',
      password: 'password123',
      role: 'user',
    });

    const admin = await User.create({
      email: 'admin@example.com',
      password: 'password123',
      role: 'admin',
    });

    token = jwt.sign({ id: user.id }, process.env.JWT_SECRET);
    adminToken = jwt.sign({ id: admin.id }, process.env.JWT_SECRET);
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  describe('POST /appointments', () => {
    it('should create a new appointment', async () => {
      const res = await request(app)
        .post('/api/appointments')
        .set('Authorization', `Bearer ${token}`)
        .send({ doctorId: 'doctorId', dateTime: new Date() });

      expect(res.statusCode).toBe(201);
      expect(res.body).toHaveProperty('status', 'pending');
    });
  });

  describe('PUT /appointments/:id/approve', () => {
    it('should approve an appointment', async () => {
      const appointment = await Appointment.create({
        patientId: 'patientId',
        doctorId: 'doctorId',
        dateTime: new Date(),
      });

      const res = await request(app)
        .put(`/api/appointments/${appointment._id}/approve`)
        .set('Authorization', `Bearer ${adminToken}`);

      expect(res.statusCode).toBe(200);
      expect(res.body.status).toBe('approved');
    });
  });
});
