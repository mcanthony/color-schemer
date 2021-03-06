//
// Copyright (c) 2015 by Mattermind Labs. All Rights Reserved.
//


var Dispatcher = require('../Dispatcher');
var EventEmitter = require('events').EventEmitter;
var constants = require('../constants');
var assign = require('object-assign');
var colors = require('../../../lib/colors');
var PaletteStore = require('../stores/PaletteStore');
var _ = require('lodash');

var CHANGE_EVENT = 'change';

var _schemeVars = {};
var _selected = null;
var _path = null;


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
  varIsCombo: function(name) {
    return _.isObject(_schemeVars[name]);
  },

  selected: function() {
    return _selected;
  },

  selectedColorName: function() {
    var sel = _schemeVars[_selected];
    if(!sel) {
      return;
    }
    if(_.isObject(sel)) {
      sel = sel[colors.comboBgKey(sel)];
    }
    if(sel && (sel[0] === '$')) {
      return sel.substr(1);
    }
    return sel;
  },
  selectedForegroundColorName: function() {
    var sel = _schemeVars[_selected];
    if(!sel) {
      return;
    }
    // should always be a combo object
    sel = sel[colors.comboFgKey(sel)];
    if(sel && (sel[0] === '$')) {
      return sel.substr(1);
    }
    return sel;
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

    case constants.SET_SCHEME:
      _schemeVars = assign({}, action.scheme);
      _path = action.path;
      SchemeVarStore.emitChange();
      break;

    case constants.SELECT_SCHEME_VAR:
      _selected = action.name;
      SchemeVarStore.emitChange();
      break;

    case constants.SET_COLOR:
      _schemeVars[_selected] = '$' + action.name;
      SchemeVarStore.emitChange();
      break;

    case constants.SET_COMBO:
      var obj = _schemeVars[_selected];
      obj[colors.comboFgKey(obj)] = '$' + action.fg;
      obj[colors.comboBgKey(obj)] = '$' + action.bg;
      SchemeVarStore.emitChange();
      break;

    default:
      // no op
  }
});


module.exports = SchemeVarStore;
