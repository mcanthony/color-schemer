//
// Copyright (c) 2015 by Mattermind Labs. All Rights Reserved.
//
// primary color functions
// usable in browser or node

var _ = require('lodash'),
   colorable = require('colorable');

var defaultColor = '#999999',
    defaultBg = '#FFFFFF';


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
  return _.assign(palette, grays);
}


/**
 * return a palette with color combinations
 * filtered by accessibility
 *
 * aa - greater than 4.5 (for normal sized text)
 * aaLarge - greater than 3 (for bold text or text larger than 24px)
 * aaa - greater than 7
 * aaaLarge - greater than 4.5
 */
function addCombos(palette, threshold) {
  var combos = colorable(palette, {threshold: threshold || 0});
  // sort by hsl
  combos.sort(function(a, b) {
    return a.values.hsl > b.values.hsl;
  });
  var result = {};
  _.each(combos, function(color) {
    result[color.name] = _.map(color.combinations,
      function(combo) {
        var key = _.findKey(palette, function(hex) {
          return hex.toUpperCase() === combo.hex.toUpperCase();
        });
        return key;
      });
  });

  return result;
}


/**
 * @param {object} map - the map of variable-name: value
 * @param {object} palette - the palette to lookup $swatch-names
 * @param {string} key - the variable name to be looked up in scheme
 * @param {string} value - a #hexString or $swatch-name to be looked up in palette
 *
 * @returns {string} hexString
 */
function colorForVar(map, palette, key, value) {
  function deflt() {
    return isBgKey(key) ? (map['default-bg'] || defaultBg) : (map['default'] || defaultColor);
  }
  if(_.isString(value) && (value[0] === '$')) {
    return palette[value.substr(1)] || deflt();
  }
  if(_.isNumber(value)) {
    return value;
  }
  // undefined or empty string
  if(_.isEmpty(value)) {
    return deflt();
  }
  return value;
}


function isBgKey(key) {
  // does it end in -b*
  return key.match(/\-b[a-z0-9]+$/);
}


function comboBgKey(combo) {
  var result;
  _.each(_.keys(combo), function(k) {
    if(k.match(/^b/)) {
      result = k;
    }
  });
  return result;
}


function comboFgKey(combo) {
  var result;
  _.each(_.keys(combo), function(k) {
    if(!k.match(/^b/)) {
      result = k;
    }
  });
  return result;
}


/**
 * Given an object representing a combo:
 * brushes: {bg: '#000000', fg: '$light-gray'}
 * resolve this to:
 * {'brushes-bg': '#000000', 'brushes-fg': '#999999'}
 *
 *
 */
function colorsForCombo(map, palette, key, value) {
  var result = {};
  _.each(value, function(v, k) {
    var concatKey = key + '-' + k;
    result[concatKey] = colorForVar(map, palette, concatKey, v);
  });
  return result;
}


/**
 * resolve the settings in a scheme file to the final color values
 * for export
 */
function outputVars(scheme, palette) {
  return _.transform(scheme, function(result, value, key) {
    if(_.isObject(value)) {
      _.assign(result, colorsForCombo(scheme, palette, key, value));
      return true;  // continue
    }
    result[key] = colorForVar(scheme, palette, key, value);
  });
}


module.exports = {
  addCombos: addCombos,
  addGrays: addGrays,
  outputVars: outputVars,
  colorForVar: colorForVar,
  colorsForCombo: colorsForCombo,
  isBgKey: isBgKey,
  comboFgKey: comboFgKey,
  comboBgKey: comboBgKey
};
