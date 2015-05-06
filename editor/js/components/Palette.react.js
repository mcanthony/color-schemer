//
// Copyright (c) 2015 by Mattermind Labs. All Rights Reserved.
//

var React = require('react');
var PaletteStore = require('../stores/PaletteStore');

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
  },

  componentWillUnmount: function() {
    PaletteStore.removeChangeListener(this._onChange);
  },

  _onChange: function() {
    this.setState(getState());
  },

  render: function() {
    // collect Palette vars
    return (
      <div>
        <h1>{this.state.path}</h1>
      </div>
    );
  }

});
