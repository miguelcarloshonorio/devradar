require('dotenv').config({
  path: process.env.NODE_ENV === 'test' ? '.env.test' : '.env',
});
const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes');
const cors = require('cors')

class AppController {
  constructor() {

    mongoose.connect(
      process.env.MONGODB_URI,
      {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true,
      },
      err => {
        // just after connect on mongo
        if (err) {
          // console.log('Error on connect database');
          console.error(`Error on connect database: ${err}`);
          throw err;
        }
      }
    );

    this.express = express();

    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.express.use(express.json());
    this.express.use(cors());
  }

  routes() {
    this.express.use(routes);
  }
}

module.exports = new AppController().express;
