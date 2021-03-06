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

describe('outputVars', function() {
  it('should set empty value to default/white default', function() {
    var scheme = {
      'primary': null,
      'brushes-bg': null,
      'brushes-fg': null
    };
    var palette = {};
    var result = colors.outputVars(scheme, palette);
    expect(result.primary).toBe('#999999');
    expect(result['brushes-bg']).toBe('#FFFFFF');
    expect(result['brushes-fg']).toBe('#999999');
  });

  it('should set empty value to default if default is set', function() {
    var scheme = {
      'primary': null,
      'brushes-bg': null,
      'brushes-fg': null,
      'default': '#990000',
      'default-bg': '#222222'
    };
    var palette = {};
    var result = colors.outputVars(scheme, palette);
    expect(result.primary).toBe(scheme.default);
    expect(result['brushes-bg']).toBe(scheme['default-bg']);
    expect(result['brushes-fg']).toBe(scheme.default);
  });

  it('should pass non-empty, non-strings through', function() {
    var scheme = {
      'thing': 2,
      'zero': 0,
      'color': '#000099'
    };
    var palette = {};
    var result = colors.outputVars(scheme, palette);
    expect(result.thing).toBe(2);
    expect(result.zero).toBe(0);
    expect(result.color).toBe('#000099');
  });

  it('should resolve variable names from palette', function() {
    var scheme = {
      'primary': '$primary',
      'not-found': '$not-found'
    };
    var palette = {
      'primary': '#FF0000'
    };
    var result = colors.outputVars(scheme, palette);
    expect(result.primary).toBe(palette.primary);
    expect(result['not-found']).toBe('#999999');
  });


  it('should interpret nested names as -hyphenated', function() {
    var scheme = {
      'name': {
        'fg': null,
        'bg': null
      }
    };
    var palette = {};
    var result = colors.outputVars(scheme, palette);
    expect(result['name-fg']).toBeDefined();
    expect(result['name-bg']).toBeDefined();
  });

  it('should resolve nested names', function() {
    var scheme = {
      'name': {
        'fg': null,
        'bg': '$secondary'
      }
    };
    var palette = {
      secondary: '#990000'
    };
    var result = colors.outputVars(scheme, palette);
    expect(result['name-fg']).toBeDefined();
    expect(result['name-bg']).toBeDefined();
    expect(result['name-bg']).toBe(palette.secondary);
  });

});


describe('nestedOutputVars', function() {
  it('should return the vars nestsed', function() {
    var scheme = {
      brushes: {
        fg: '#000000',
        bg: '$light-gray'
      }
    };
    var palette = {
      'light-gray': '#999999'
    };

    var result = colors.nestedOutputVars(scheme, palette);
    expect(result.brushes).toBeDefined();
    expect(result.brushes.fg).toBe('#000000');
    expect(result.brushes.bg).toBe(palette['light-gray']);
  });
});
