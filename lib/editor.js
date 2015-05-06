//
// Copyright (c) 2015 by Mattermind Labs. All Rights Reserved.
//
// node.js server for the editor app

'use strict';

var connect = require('connect');
var serveStatic = require('serve-static');
var path = require('path');
var files = require('./files');
var colors = require('./colors');


function main(mapPath, palettePath, port) {

  var app = connect();
  app.use(serveStatic(path.join(__dirname, '../editor')));

  app.use('/scheme', function(req, res, next) {
    // throw error if not found or unreadable
    var map = files.loadYAML(mapPath);
    var palette = files.loadJSON(palettePath);
    palette = colors.addGrays(palette);

    var obj = {
      map: map,
      mapPath: mapPath,
      palette: palette,
      palettePath: palettePath
    };
    res.writeHead(200, {'Content-Type': 'application/json'});
    res.write(JSON.stringify(obj));
    res.end();
    next();
  });
  // app.use('/save', function(req, res, next) {
  //   console.log('save');
  //   next();
  // });

  port = port || 8090;
  console.log('Server running on http://127.0.0.1:' + port);
  app.listen(port);
}


module.exports = main;
