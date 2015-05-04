'use strict';

/**
 * load colors from a paletton.com xml file
 * run colors + grey scale through colorable
 * and filter for readable combos
 * and write to {palette-hash}.yaml
 */

var fs = require('fs'),
   xml = require('libxmljs'),
   yaml = require('js-yaml'),
   _ = require('lodash'),
   colorable = require('colorable');

var defaultColor = '#999999',
    defaultBg = '#FFFFFF';


function loadPaletton(path) {
  return parsePaletton(fs.readFileSync(path, 'utf8'));
}


/**
 * convert an XML color scheme from paletton.com
 * to a simple dict
 */
function parsePaletton(doc) {
  var xmlDoc = xml.parseXml(doc);
  var palette = {};
  var colors = xmlDoc.find('//color');
  _.each(colors, function(c) {
    palette[c.attr('id').value()] = {
      rgb: c.attr('rgb').value(),
      r: c.attr('r0').value(),
      g: c.attr('g0').value(),
      b: c.attr('b0').value()
    };
  });

  return palette;
}


function addGrays(palette) {
  var grays =  {
    'white': '#ffffff',
    'black': '#000000',
    'lighten-5': '#fafafa',
    'lighten-4': '#f5f5f5',
    'lighten-3': '#eeeeee',
    'lighten-2': '#e0e0e0',
    'lighten-1': '#bdbdbd',
    'gray':      '#9e9e9e',
    'darken-1': '#757575',
    'darken-2': '#616161',
    'darken-3': '#424242',
    'darken-4': '#212121'
  };
  return _.assign(palette, _.mapValues(grays, function(g) { return {rgb: g}; }));
}


/**
 * expand a palette into a larger list of color combinations
 * filtered by accessibility
 *
 * aa - greater than 4.5 (for normal sized text)
 * aaLarge - greater than 3 (for bold text or text larger than 24px)
 * aaa - greater than 7
 * aaaLarge - greater than 4.5
 */
function addCombos(palette, threshold) {
  var colors = _.mapValues(palette, function(p) {
    return p.rgb;
  });
  var combos = colorable(colors, {threshold: threshold || 0});
  // sort by hsl
  combos.sort(function(a, b) {
    return a.values.hsl > b.values.hsl;
  });
  var result = _.assign({}, palette);
  // console.log(JSON.stringify(palette, null, 2));
  _.each(combos, function(c) {
    result[c.name].combinations = _.map(c.combinations, function(fg) {
      var key = _.findKey(palette, function(p) {
        return p.rgb === fg.hex;
      });
      return key || fg.hex;
    });
  });

  // console.log(JSON.stringify(result, null, 2));
  return result;
}


function mapToScheme(map, palette) {

  function resolve(value, key) {
      // does it end in -b*
    var deflt = key.match(/\-b[a-z0-9]+$/) ? (map['default-bg'] || defaultBg) : (map['default'] || defaultColor);
    if(_.isString(value) && (value.substr(0, 1) === '$')) {
      return palette[value.substr(1)] || deflt;
    }
    if(_.isNumber(value)) {
      return value;
    }
    // undefined or empty string
    if(_.isEmpty(value)) {
      return deflt;
    }
    return value;
  }

  return _.transform(map, function(result, value, key) {
    if(_.isObject(value)) {
      _.each(value, function(v, k) {
        var concatKey = key + '-' + k;
        result[concatKey] = resolve(v, concatKey);
      });
      return true;  // continue
    }
    result[key] = resolve(value, key);
  });
}



/* ------------------------- commands ------------------------------------- */

function convert(inPath, format) {
  // console.log(inPath, format);
  var palette = loadPaletton(inPath);
  return JSON.stringify(palette, null, 2);
}

function makeCombos(palettePath, threshold, grays) {
  var palette = JSON.parse(fs.readFileSync(palettePath, 'utf8'));
  if(grays) {
    palette = addGrays(palette);
  }
  var expanded = addCombos(palette, threshold || 3);
  return JSON.stringify(expanded, null, 2);
}

function mapScheme(yamlMap, jsonPalette, format) {
  var map = yaml.safeLoad(fs.readFileSync(yamlMap, 'utf8'));
  var scheme = mapToScheme(map, jsonPalette);
  return JSON.stringify(scheme, null, 2);
}


module.exports = {
  // command line functions
  convert: convert,
  makeCombos: makeCombos,
  mapScheme: mapScheme,

  // library functions
  parsePaletton: parsePaletton,
  addCombos: addCombos,
  mapToScheme:mapToScheme
};
