const request = require('supertest');
const app = require('../app');
const { connectMongo } = require('../config/database');
const User = require('../models/sql/User');

describe('User API', () => {
  beforeAll(async () => {
    await connectMongo();
  });

  afterAll(async () => {
    await User.destroy({ where: {} }); // Cleanup test users
  });

  describe('POST /register', () => {
    it('should register a new user', async () => {
      const res = await request(app)
        .post('/api/users/register')
        .send({
          email: 'test@example.com',
          password: 'password123',
          role: 'user',
        });

      expect(res.statusCode).toBe(201);
      expect(res.body).toHaveProperty('id');
    });
  });

  describe('POST /login', () => {
    it('should log in a user', async () => {
      await User.create({
        email: 'login@example.com',
        password: 'password123',
      });

      const res = await request(app)
        .post('/api/users/login')
        .send({
          email: 'login@example.com',
          password: 'password123',
        });

      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty('token');
    });
  });
});
