//
// Copyright (c) 2015 by Mattermind Labs. All Rights Reserved.
//


var files = require('./files');
var colors = require('./colors');



function convert(inPath, format) {
  // only paletton supported for now
  var palette = files.loadPaletton(inPath);
  return JSON.stringify(palette, null, 2);
}

function makeCombos(palettePath, threshold, grays) {
  var palette = files.loadJSON(palettePath);
  if(grays) {
    palette = colors.addGrays(palette);
  }
  // {name: [name, name], ...}
  var combos = colors.addCombos(palette, threshold || 3);
  return files.asJSON(combos);
}

function mapScheme(yamlMap, jsonPalette, format) {
  var map = files.loadYAML(yamlMap);
  var palette = files.loadJSON(jsonPalette);
  var scheme = colors.mapToScheme(map, palette);
  return files.formatOutput(scheme, format);
}


module.exports = {
    convert: convert,
    makeCombos: makeCombos,
    mapScheme: mapScheme
};
