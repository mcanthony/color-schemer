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
          return hex === combo.hex;
        });
        return key;
      });
  });

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


module.exports = {
  addCombos: addCombos,
  addGrays: addGrays,
  mapToScheme: mapToScheme
};