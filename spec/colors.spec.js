'use strict';

var colors = require('../lib/colors.js');


var palette = {
  "primary-0": "#740037",
  "primary-1": "#3B001C",
  "primary-2": "#5D002C",
  "primary-3": "#970047",
  "primary-4": "#BA1965",
  "secondary-1-0": "#3F3E3D",
  "secondary-1-1": "#6A6967",
  "secondary-1-2": "#51504F",
  "secondary-1-3": "#3C3A38",
  "secondary-1-4": "#1A1917",
  "secondary-2-0": "#747496",
  "secondary-2-1": "#E4E4EA",
  "secondary-2-2": "#A6A6BB",
  "secondary-2-3": "#4C4C78",
  "secondary-2-4": "#2B2B5B",
  "complement-0": "#A1CC5F",
  "complement-1": "#B4EF59",
  "complement-2": "#ADE25C",
  "complement-3": "#85A652",
  "complement-4": "#6D844A"
};

describe('addCombos', function(){
  it('should add combinations', function() {
    var result = colors.addCombos(palette);
    expect(result).toBeDefined();
    expect(result['complement-4']).toBeDefined();
    // expect(result['complement-4'].length)
    // expect(result['complement-4'].combinations[0]).toBeDefined();
  });
});

describe('mapToScheme', function() {
  it('should set empty value to default/white default', function() {
    var map = {
      'primary': null,
      'brushes-bg': null,
      'brushes-fg': null
    };
    var scheme = {};
    var result = colors.mapToScheme(map, scheme);
    expect(result.primary).toBe('#999999');
    expect(result['brushes-bg']).toBe('#FFFFFF');
    expect(result['brushes-fg']).toBe('#999999');
  });

  it('should set empty value to default if default is set', function() {
    var map = {
      'primary': null,
      'brushes-bg': null,
      'brushes-fg': null,
      'default': '#990000',
      'default-bg': '#222222'
    };
    var scheme = {};
    var result = colors.mapToScheme(map, scheme);
    expect(result.primary).toBe(map.default);
    expect(result['brushes-bg']).toBe(map['default-bg']);
    expect(result['brushes-fg']).toBe(map.default);
  });

  it('should pass non-empty, non-strings through', function() {
    var map = {
      'thing': 2,
      'zero': 0,
      'color': '#000099'
    };
    var scheme = {};
    var result = colors.mapToScheme(map, scheme);
    expect(result.thing).toBe(2);
    expect(result.zero).toBe(0);
    expect(result.color).toBe('#000099');
  });

  it('should resolve variable names from palette', function() {
    var map = {
      'primary': '$primary',
      'not-found': '$not-found'
    };
    var scheme = {
      'primary': '#FF0000'
    };
    var result = colors.mapToScheme(map, scheme);
    expect(result.primary).toBe(scheme.primary);
    expect(result['not-found']).toBe('#999999');
  });


  it('should interpret nested names as -hyphenated', function() {
    var map = {
      'name': {
        'fg': null,
        'bg': null
      }
    };
    var scheme = {};
    var result = colors.mapToScheme(map, scheme);
    expect(result['name-fg']).toBeDefined();
    expect(result['name-bg']).toBeDefined();
  });

  it('should resolve nested names', function() {
    var map = {
      'name': {
        'fg': null,
        'bg': '$secondary'
      }
    };
    var scheme = {
      secondary: '#990000'
    };
    var result = colors.mapToScheme(map, scheme);
    expect(result['name-fg']).toBeDefined();
    expect(result['name-bg']).toBeDefined();
    expect(result['name-bg']).toBe(scheme.secondary);
  });

});
