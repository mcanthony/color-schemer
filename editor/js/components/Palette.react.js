//
// Copyright (c) 2015 by Mattermind Labs. All Rights Reserved.
//

var React = require('react');
var PaletteStore = require('../stores/PaletteStore');
var SchemeStore = require('../stores/SchemeStore');
var Swatch = require('./Swatch.react');
var _ = require('lodash');


function getState() {
  return {
    swatches: PaletteStore.getAll(),
    path: PaletteStore.path()
  };
}

module.exports = React.createClass({

  getInitialState: function() {
    return getState();
  },

  componentDidMount: function() {
    PaletteStore.addChangeListener(this._onChange);
    SchemeStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function() {
    PaletteStore.removeChangeListener(this._onChange);
    SchemeStore.removeChangeListener(this._onChange);
  },

  _onChange: function() {
    this.setState(getState());
  },

  render: function() {
    var svs = _.map(this.state.swatches, function(value, key) {
      return (
        <Swatch key={key} name={key} value={value} />
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
