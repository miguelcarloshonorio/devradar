const request = require('supertest');
const app = require('../../src/app');
const mongoose = require('mongoose');

const dev = {
  github_username: 'miguelcarloshonorio',
  techs: 'ReactJS, React Native, Node.js, Scrum',
  latitude: -2.560961,
  longitude: -44.2194616,
};

describe('Dev Controllers Tests', () => {
  beforeEach(async () => {
    // if has something to do

    await request(app)
      .post('/devs')
      .send(dev);
  });

  afterAll(async done => {
    // Closing the DB connection allows Jest to exit successfully.
    await mongoose.connection.close();
    done();
  });

  it('should query devs by Tech', async () => {
    const response = await request(app)
      .get('/search?latitude=-2.560961&longitude=-44.2194616&techs=ReactJS');

    const {devs} = response.body;
    expect(devs.length).toBeGreaterThan(0);
    expect(response.status).toBe(200);
  });

  it('should query devs by Tech return 0', async () => {
    const response = await request(app)
      .get('/search?latitude=-2.560961&longitude=-44.2194616&techs=VueJS');

    const {devs} = response.body;
    expect(devs.length).toBe(0);
    expect(response.status).toBe(200);
  });
});
