var http = require('http');

var hostname = 'localhost';
var port = 3000;

var server = http.createServer(requestListener);
server.listen(port, hostname, listenCallback);



function requestListener(request, response) {
  console.log(request.headers);

  response.writeHead(200, { 'Content-Type': 'text/html' });
  response.end('<h1>Hello World!</h1>');
}

function listenCallback() {
  console.log('Server running at http://' + hostname + ':' + port + '/');
}
