const request = require('supertest');
const app = require("../../app"); 

describe('GET /api/meals', () => {
  it('should return a list of meals', async () => {
    const res = await request(app).get('/api/meals');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBeTruthy();
  });
});