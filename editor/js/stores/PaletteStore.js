//
// Copyright (c) 2015 by Mattermind Labs. All Rights Reserved.
//


var Dispatcher = require('../Dispatcher');
var EventEmitter = require('events').EventEmitter;
var constants = require('../constants');
var assign = require('object-assign');
var colors = require('../../../lib/colors');

var CHANGE_EVENT = 'change';

var _swatches = {};
var _path = null;
var _combos = {};
var _selected = null;


var PaletteStore = assign({}, EventEmitter.prototype, {

  /**
   * @return {object}  varName: hexColor, ...
   */
  getAll: function() {
    return _swatches;
  },

  path: function() {
    return _path;
  },

  selected: function() {
    return _selected;
  },

  combosForColor: function(colorName) {
    return _combos[colorName] || [];
  },

  colorForName: function(colorName) {
    return _swatches[colorName];
  },

  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },

  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }
});


Dispatcher.register(function(action) {

  switch(action.actionType) {

    case constants.SET_PALETTE:
      _swatches = assign({}, action.palette);
      _path = action.path;
      _combos = colors.addCombos(_swatches, 3);
      PaletteStore.emitChange();
      break;

    case constants.SELECT_SWATCH:
      _selected = action.name;
      PaletteStore.emitChange();
      break;

    default:
      // no op
  }
});


module.exports = PaletteStore;
