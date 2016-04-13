/*jshint esversion:6*/

var express = require('express');
var morgan = require('morgan');
var cookieParser = require('cookie-parser');

var hostname = 'localhost';
var port = 3000;

var app = express();

app.use(morgan('dev'));
app.use(cookieParser('12345-67890-09876-54321'));
app.use(auth);
app.use(express.static(__dirname + '/public'));
app.use(authErrorHandler);

app.listen(port, hostname, function() {
  console.log(`Server running at http://${hostname}:${port}/`);
});



function auth(req, res, next) {
  var err;
  console.log(req.headers);

  if (!req.signedCookies.user) {
    var authHeader = req.headers.authorization;
    if (!authHeader) {
      err = new Error('You are not authenticated!');
      err.status = 401;
      next(err);
      return;
    }

    var auth = new Buffer(authHeader.split(' ')[1], 'base64').toString().split(':');
    var user = auth[0];
    var pass = auth[1];
    if (user == 'admin' && pass == 'password') {
      res.cookie('user', 'admin', { signed: true });
      next(); // authorized
    } else {
      err = new Error('You are not authenticated!');
      err.status = 401;
      next(err);
    }
  } else {
    if (req.signedCookies.user == 'admin') {
      console.log(req.signedCookies);
      next();
    } else {
      err = new Error('You are not authenticated!');
      err.status = 401;
      next(err);
    }
  }
}

function authErrorHandler(err, req, res, next) {
  res.writeHead(err.status || 500, {
    'WWW-Authenticate': 'Basic',
    'Content-Type': 'text/plain'
  });
  res.end(err.message);
}
