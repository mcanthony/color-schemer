//
// Copyright (c) 2015 by Mattermind Labs. All Rights Reserved.
//

var Dispatcher = require('./Dispatcher');
var constants = require('./constants');
var PaletteStore = require('./stores/PaletteStore');
var SchemeStore = require('./stores/SchemeStore');
var $ = require('jquery');

module.exports = {

  setScheme: function(scheme, path) {
    Dispatcher.dispatch({
      actionType: constants.SET_SCHEME,
      scheme: scheme,
      path: path
    });
  },
  setPalette: function(palette, path) {
    Dispatcher.dispatch({
      actionType: constants.SET_PALETTE,
      palette: palette,
      path: path
    });
  },

  selectSchemeVar: function(name) {
    Dispatcher.dispatch({
      actionType: constants.SELECT_SCHEME_VAR,
      name: name
    });
  },

  selectSwatch: function(name) {
    Dispatcher.dispatch({
      actionType: constants.SELECT_SWATCH,
      name: name
    });
  },

  setColor: function(name) {
    Dispatcher.dispatch({
      actionType: constants.SET_COLOR,
      name: name
    });
  },

  setCombo: function(bg, fg) {
    Dispatcher.dispatch({
      actionType: constants.SET_COMBO,
      bg: bg,
      fg: fg
    });
  },

  save: function() {
    var data = {
      scheme: SchemeStore.getAll(),
      schemePath: SchemeStore.path(),
      palette: PaletteStore.getAll(),
      palettePath: PaletteStore.path()
    };
    $.ajax({
      method: 'POST',
      url: '/save',
      contentType: 'application/json',
      data: JSON.stringify(data),
      dataType: 'json' // reply is expected to be JSON
    })
      .then(function(data) {
        console.log('success', data);
        // constants.CLEAR_DIRTY_FLAG
      },function(err) {
        console.error('failed to save:', err);
        // constants.ERROR
      });
  }

};
