const request = require('supertest');
const mongoose = require('mongoose');
const express = require('express');
const User = require('../models/user');
const Save = require('../models/save');
const memoryRoutes = require('../routes/memoryRoutes');
require('dotenv').config({ path: './config/.env' });

let app;
let server;
let testUser;

beforeAll(async () => {
  // Connect to MongoDB
  await mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  // Create Express app and mount routes
  app = express();
  app.use(express.json());
  app.use('/api/memory', memoryRoutes);

  // Create a test user
  testUser = new User({ username: 'jestuser', password: 'testpass' });
  await testUser.save();
});

afterAll(async () => {
  // Clean up test data
  await Save.deleteMany({ userID: testUser._id });
  await User.deleteOne({ _id: testUser._id });
  await mongoose.connection.close();
});

describe('Memory API', () => {
  it('should save a valid game result', async () => {
    const res = await request(app)
      .post('/api/memory/save')
      .send({
        userID: testUser._id.toString(),
        gameDate: new Date().toISOString(),
        failed: 1,
        difficulty: 'Easy',
        completed: 5,
        timeTaken: 60,
      });
    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('message', 'Game data saved successfully');
  });

  it('should return validation error for missing fields', async () => {
    const res = await request(app)
      .post('/api/memory/save')
      .send({
        userID: testUser._id.toString(),
        gameDate: new Date().toISOString(),
        failed: 1,
        difficulty: 'Easy',
        completed: 5,
        // timeTaken missing
      });
    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty('errors');
    expect(Array.isArray(res.body.errors)).toBe(true);
  });

  it('should fetch game result history', async () => {
    const res = await request(app).get('/api/memory/history');
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('data');
    expect(Array.isArray(res.body.data)).toBe(true);
  });
}); 