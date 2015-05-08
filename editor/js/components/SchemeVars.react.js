//
// Copyright (c) 2015 by Mattermind Labs. All Rights Reserved.
//

var React = require('react');
var SchemeStore = require('../stores/SchemeStore');
var PaletteStore = require('../stores/PaletteStore');
var SchemeVar = require('./SchemeVar.react');
var _ = require('lodash');

function getState() {
  return {
    schemeVars: SchemeStore.getAll(),
    path: SchemeStore.path()
  };
}

module.exports = React.createClass({

  getInitialState: function() {
    return getState();
  },

  componentDidMount: function() {
    SchemeStore.addChangeListener(this._onChange);
    PaletteStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function() {
    SchemeStore.removeChangeListener(this._onChange);
    PaletteStore.removeChangeListener(this._onChange);
  },

  _onChange: function() {
    this.setState(getState());
  },

  render: function() {
    var svs = _.map(this.state.schemeVars, function(value, key) {
      return (
        <SchemeVar key={key} name={key} value={value} />
      );
    });

    return (
      <div>
        <h1>{this.state.path}</h1>
        {svs}
      </div>
    );
  }

});
