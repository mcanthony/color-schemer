'use strict';

var connect = require('connect');
var serveStatic = require('serve-static');
var path = require('path');

function main(schemePath, palettePath, port) {
  var app = connect();
  app.use(serveStatic(path.join(__dirname, '../editor')));

  // app.use('/scheme', function(req, res, next) {
  //   // send the scheme and palette
  //   console.log('scheme');
  //   next();
  // });
  // app.use('/save', function(req, res, next) {
  //   console.log('save');
  //   next();
  // });

  port = port || 8090;
  console.log('Server running on http://127.0.0.1:' + port);
  app.listen(port);
}


module.exports = main;
