const { Router } = require('express');
const DevController = require('./controllers/DevController');
const SearchController = require('./controllers/SearchController');

const routes = Router();

//default index
routes.get('/', (req, res)=>{
  res.send('Bem vindo ao dev api');
});

routes.post('/devs', DevController.store);
routes.get('/devs', DevController.index);

routes.get('/search', SearchController.index);

module.exports = routes;