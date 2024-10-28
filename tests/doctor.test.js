const request = require('supertest');
const app = require('../app');
const mongoose = require('mongoose');
const { connectMongo } = require('../config/database');
const Doctor = require('../models/mongodb/Doctor');
const User = require('../models/sql/User');

describe('Doctor API', () => {
  let token;
  let adminToken;

  beforeAll(async () => {
    await connectMongo();
    
    // Create test admin and user
    const user = await User.create({
      email: 'testuser@example.com',
      password: 'password123',
      role: 'user',
    });

    const admin = await User.create({
      email: 'testadmin@example.com',
      password: 'password123',
      role: 'admin',
    });

    token = jwt.sign({ id: user.id }, process.env.JWT_SECRET);
    adminToken = jwt.sign({ id: admin.id }, process.env.JWT_SECRET);
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  describe('POST /doctors', () => {
    it('should create a new doctor', async () => {
      const res = await request(app)
        .post('/api/doctors')
        .set('Authorization', `Bearer ${adminToken}`)
        .send({
          name: 'Dr. John Doe',
          specialization: 'Cardiology',
          availability: [{ day: 'Monday', slots: [{ startTime: '09:00', endTime: '12:00' }] }],
        });

      expect(res.statusCode).toBe(201);
      expect(res.body).toHaveProperty('name', 'Dr. John Doe');
    });
  });
});
