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
    var data = files.loadYAML(mapPath);
    var palette;
    // if data.palettePath then its relative to that file
    // palettePath = palettePath || data.palettePath;
    if(palettePath) {
      palette = files.loadJSON(palettePath);
      palette = colors.addGrays(palette);
    } else {
      palette = data.palette || {};
    }

    var obj = {
      map: data.scheme,
      mapPath: mapPath,
      palette: palette,
      palettePath: palettePath,
      settings: data.settings || {}
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
