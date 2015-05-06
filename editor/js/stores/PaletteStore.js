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

/**
 * Update a scheme_var item
 * @param  {string} varname
 * @param {object} updates An object literal containing only the data to be
 *     updated.
 */
// function update(name, updates) {
//   _swatches[name] = assign({}, _swatches[name], updates);
// }


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

  combosForColor: function(colorName) {
    return _combos[colorName] || [];
  },

  colorForName: function(colorName) {
    return _swatches[colorName];
  },

  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },

  /**
   * @param {function} callback
   */
  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  /**
   * @param {function} callback
   */
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

    default:
      // no op
  }
});


module.exports = PaletteStore;
