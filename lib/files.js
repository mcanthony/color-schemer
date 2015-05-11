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
   _ = require('lodash');


function loadPaletton(path) {
  return parsePaletton(fs.readFileSync(path, 'utf8'));
}


function loadJSON(path) {
  return JSON.parse(fs.readFileSync(path, 'utf8'));
}


function loadYAML(path) {
  return yaml.safeLoad(fs.readFileSync(path, 'utf8'));
}


/**
 * This is the format the scheme is saved in,
 * including the scheme variables, the palette,
 * and an optional settings object for UI state
 * or palette generation parameters.
 */
function storeSchemeData(scheme, palette, settings) {
  return {
    scheme: scheme,
    palette: palette,
    settings: settings || {}
  };
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
    palette[c.attr('id').value()] = c.attr('rgb').value();
  });

  return palette;
}


/**
 * formats for exporting the semantic scheme
 */
function formatOutput(scheme, format) {
  switch(format || 'json') {
    case 'json':
      return asJSON(scheme);
    case 'js':
      return asJS(scheme);
    case 'scss':
      return asSCSS(scheme);
    case 'yaml':
      return asYAML(scheme);
    // h
  }
  throw new Error('Unsupported format: ' + format);
}


/**
 * although there should be no null or undefined values
 * because they would have been replaced by defaultColor,
 * clean it to be sure.
 */
function clearEmpties(scheme) {
  return _.mapValues(scheme, function(v) {
    return _.isEmpty(v) ? '' : v;
  });
}


function asJS(scheme) {
  return 'module.exports = ' + asJSON(scheme) + ';\n';
}


function asJSON(scheme) {
  return JSON.stringify(clearEmpties(scheme), null, 2);
}


function asSCSS(scheme) {
  // $key:  value;
  var rows = _.map(clearEmpties(scheme), function(v, k) {
    return '$' + k + ':  ' + v;
  });
  return rows.join('\n');
}


function asYAML(scheme) {
  return yaml.safeDump(clearEmpties(scheme));
}


module.exports = {
  loadPaletton: loadPaletton,
  loadYAML: loadYAML,
  loadJSON: loadJSON,
  storeSchemeData: storeSchemeData,
  parsePaletton: parsePaletton,
  formatOutput: formatOutput,
  asJS: asJS,
  asJSON: asJSON,
  asSCSS: asSCSS,
  asYAML: asYAML
};
