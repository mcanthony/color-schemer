//
// Copyright (c) 2015 by Mattermind Labs. All Rights Reserved.
//


var Dispatcher = require('../Dispatcher');
var EventEmitter = require('events').EventEmitter;
var constants = require('../constants');
var assign = require('object-assign');

var CHANGE_EVENT = 'change';

var _swatches = {};
var _path = null;

/**
 * Update a scheme_var item
 * @param  {string} varname
 * @param {object} updates An object literal containing only the data to be
 *     updated.
 */
function update(name, updates) {
  _swatches[name] = assign({}, _swatches[name], updates);
}

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
      _swatches = assign({}, action.palettes);
      _path = action.path;
      PaletteStore.emitChange();
      break;

    default:
      // no op
  }
});


module.exports = PaletteStore;
