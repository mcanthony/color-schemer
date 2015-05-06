//
// Copyright (c) 2015 by Mattermind Labs. All Rights Reserved.
//

var React = require('react');
var SchemeStore = require('../stores/SchemeStore');

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
  },

  componentWillUnmount: function() {
    SchemeStore.removeChangeListener(this._onChange);
  },

  _onChange: function() {
    this.setState(getState());
  },

  render: function() {
    // collect scheme vars
    return (
      <div>
        <h1>{this.state.path}</h1>
      </div>
    );
  }

});
