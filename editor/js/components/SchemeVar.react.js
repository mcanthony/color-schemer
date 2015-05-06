//
// Copyright (c) 2015 by Mattermind Labs. All Rights Reserved.
//

var React = require('react');
var SchemeStore = require('../stores/SchemeStore');
var colors = require('../../../lib/colors');
var _ = require('lodash');


function bg(combo) {
  var result;
  _.each(_.keys(combo), function(k) {
    if(colors.isBgKey(k)) {
      result = combo[k];
    }
  });
  return result;
}

function fg(combo) {
  var result;
  _.each(_.keys(combo), function(k) {
    if(!colors.isBgKey(k)) {
      result = combo[k];
    }
  });
  return result;
}


module.exports = React.createClass({

  // getInitialState: function() {
  //   return getState();
  // },

  render: function() {
    var defaultStyle = {
      background: '#FFFFFF',
      color: '#FF0000'
    },
    style={};
    if(_.isObject(this.props.value)) {
      var combo = SchemeStore.colorsForComboVar(this.props.name, this.props.value);
      style.background = bg(combo);
      style.color = fg(combo);
    } else {
      style.background = SchemeStore.colorForVar(this.props.name, this.props.value);
      style.color = '#666666';
    }

    // but defaults are already resolved
    var somethingMissing = {};
    if(!(style.background && style.color)) {
      somethingMissing = {
        'font-style': 'italic',
        border: '1px solid #ff0000'
      };
    }

    var styles = _.extend(defaultStyle, style, somethingMissing);
    return (
      <div style={styles}>
        <span>{this.props.name}</span>
      </div>
    );
  }

});
