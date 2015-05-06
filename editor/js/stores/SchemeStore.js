//
// Copyright (c) 2015 by Mattermind Labs. All Rights Reserved.
//


var Dispatcher = require('../Dispatcher');
var EventEmitter = require('events').EventEmitter;
var constants = require('../constants');
var assign = require('object-assign');
var colors = require('../../../lib/colors');
var PaletteStore = require('../stores/PaletteStore');

var CHANGE_EVENT = 'change';

var _schemeVars = {};
var _selected = null;
var _path = null;


/**
 * Update a scheme_var item
 * @param  {string} varname
 * @param {object} updates An object literal containing only the data to be
 *     updated.
 */
function update(name, updates) {
  _schemeVars[name] = assign({}, _schemeVars[name], updates);
}


var SchemeVarStore = assign({}, EventEmitter.prototype, {

  /**
   * @return {object}  varName: hexColor, ...
   */
  getAll: function() {
    return _schemeVars;
  },

  path: function() {
    return _path;
  },

  colorForVar: function(varname, value) {
    return colors.colorForVar(_schemeVars, PaletteStore.getAll(), varname, value);
  },

  /**
   * @returns {object} -
   *          {'brushes-bg': '#000000', 'brushes-fg': '#999999'}
   */
  colorsForComboVar: function(varname, obj) {
    return colors.colorsForCombo(_schemeVars, PaletteStore.getAll(), varname, obj);
  },

  selected: function() {
    if(!_selected) {
      return undefined;
    }
    return _schemeVars[_selected];
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

    case constants.SET_SCHEME:
      _schemeVars = assign({}, action.scheme);
      _path = action.path;
      SchemeVarStore.emitChange();
      break;

    case constants.SELECT:
      _selected = action.id;
      SchemeVarStore.emitChange();
      break;

    case constants.SET_COLOR:
      // set color to selected item
      console.log(action.color);
      break;

    default:
      // no op
  }
});


module.exports = SchemeVarStore;
