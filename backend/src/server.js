const app = require('./app');
const http = require('http');
const { setUpWebSocket} = require('./websocket');

const server = http.Server(app);
setUpWebSocket(server);

const port = process.env.PORT || 3333;

server.listen(port, () => {
  console.log(`server running on port ${port}`);
});