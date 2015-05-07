//
// Copyright (c) 2015 by Mattermind Labs. All Rights Reserved.
//

var Dispatcher = require('./Dispatcher');
var constants = require('./constants');

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
  }


  // SAVE

};
