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


var uiStyles = {
  default: {
    background: '#FFFF0F',
    color: '#FF00F0'
  },
  missing: {
    fontStyle: 'italic',
    border: '1px solid #ff0000'
  },
  selected: {
    border: '1px solid #000000'
  },
  notSelected: {
    border: '1px solid #FFFFFF'
  }
};

module.exports = React.createClass({

  render: function() {
    var
      style = {},
      styles = [uiStyles.default],
      isSelected = SchemeStore.selected() === this.props.name;

    if(_.isObject(this.props.value)) {
      var combo = SchemeStore.colorsForComboVar(this.props.name, this.props.value);
      style.background = bg(combo);
      style.color = fg(combo);
    } else {
      style.background = SchemeStore.colorForVar(this.props.name, this.props.value);
      style.color = uiStyles.default.color;
    }
    styles.push(style);

    // TODO defaults are already resolved
    // so this will never show anything as unset
    if(!(style.background && style.color)) {
      styles.push(uiStyles.missing);
    }

    styles.push(isSelected ? uiStyles.selected : uiStyles.notSelected);

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
