const request = require('supertest');
const app = require('../../src/app');
const mongoose = require('mongoose');

const dev = {
  github_username: 'miguelcarloshonorio',
  techs: 'ReactJS, React Native, Node.js, Scrum',
  latitude: -2.560961,
  longitude: -44.2194616,
};
const devList = [];

describe('Dev Controllers Tests', () => {
  beforeEach(async () => {
    // if has something to do

    devList.push(dev);
  });

  afterAll(async done => {
    // Closing the DB connection allows Jest to exit successfully.
    await mongoose.connection.close();
    done();
  });

  it('should create dev', async () => {
    const response = await request(app)
      .post('/devs')
      .send(dev);
    console.log(response.body);
    const {name} = response.body;
    expect(name).toBe('Miguel Carlos Honório');
    expect(response.status).toBe(200);
  });

});
