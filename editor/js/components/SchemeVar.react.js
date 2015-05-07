//
// Copyright (c) 2015 by Mattermind Labs. All Rights Reserved.
//

var React = require('react');
var SchemeStore = require('../stores/SchemeStore');
var Actions = require('../actions');
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

  render: function() {
    var
      defaultStyle = {
        background: '#FFFFFF',
        color: '#FF0000'
      },
      style = {},
      styles = [defaultStyle],
      isSelected = SchemeStore.selected() === this.props.name;

    if(_.isObject(this.props.value)) {
      var combo = SchemeStore.colorsForComboVar(this.props.name, this.props.value);
      style.background = bg(combo);
      style.color = fg(combo);
    } else {
      style.background = SchemeStore.colorForVar(this.props.name, this.props.value);
      style.color = '#666666';
    }
    styles.push(style);

    // TODO defaults are already resolved
    // so this will never show anything as unset
    if(!(style.background && style.color)) {
      styles.push({
        'font-style': 'italic',
        border: '1px solid #ff0000'
      });
    }

    styles.push({
      border: '1px solid ' + (isSelected ? '#000000' : style.background || '#FFFFFF')
    });

    style = _.assign.apply(this, styles);
    return (
      <div style={style} onClick={this.handleClick} className='schemeVar'>
        <span>{this.props.name}</span>
      </div>
    );
  },

  handleClick: function(event) {
    Actions.selectSchemeVar(this.props.name);
  }

});
