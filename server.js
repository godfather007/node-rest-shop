const http = require('http');
const app = require('./app')
console.log(1)
const port = (process.env.port || 3000);
const server = http.createServer(app);
console.log(2)
server.listen(port);
console.log('port '+port)