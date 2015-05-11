//
// Copyright (c) 2015 by Mattermind Labs. All Rights Reserved.
//
// node.js server for the editor app

'use strict';

var connect = require('connect');
var serveStatic = require('serve-static');
var bodyParser = require('body-parser');
var path = require('path');
var files = require('./files');
var colors = require('./colors');
var fs = require('fs');


function main(mapPath, palettePath, port) {

  var app = connect();
  app.use(bodyParser.json());
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
    jsonResponse(res, obj);
    next();
  });

  app.use('/save', function(req, res, next) {
    var settings = req.body.settings || {};
    if(palettePath && (!settings.palettePath)) {
      settings.palettePath = palettePath;
    }
    var data = files.storeSchemeData(req.body.scheme, req.body.palette, settings);
    var yaml = files.asYAML(data);
    fs.writeFile(mapPath, yaml, function(err) {
      if(err) {
        jsonResponse(res, {'Error': err}, 500);
      } else {
        jsonResponse(res, {'Result': 'OK'});
      }
      next();
    });

  });

  port = port || 8090;
  console.log('Server running on http://127.0.0.1:' + port);
  app.listen(port);
}

function jsonResponse(res, data, status) {
  res.writeHead(status || 200, {'Content-Type': 'application/json'});
  res.write(JSON.stringify(data));
  res.end();
}

module.exports = main;
