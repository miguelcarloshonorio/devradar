const request = require('supertest');
const app = require('../src/app');
const mongoose = require('mongoose');

describe("Test Server APP", () => {
  beforeEach(async () => {
    // if has something to do
  });

  afterAll(async done => {
    // Closing the DB connection allows Jest to exit successfully.
    await mongoose.connection.close();
    done();
  });

  it("should return 200 on load server", async () => {
    
    const response = await request(app)
      .get("/");

    expect(response.status).toBe(200);
  });

  it("should return 200 on load route devs", async () => {
    
    const response = await request(app)
      .get("/devs");

    expect(response.status).toBe(200);
  });
  
});
