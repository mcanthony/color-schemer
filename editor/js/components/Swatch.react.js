//
// Copyright (c) 2015 by Mattermind Labs. All Rights Reserved.
//

var React = require('react');
var PaletteStore = require('../stores/PaletteStore');
var SchemeStore = require('../stores/SchemeStore');
var Actions = require('../actions');
// var colors = require('../../../lib/colors');
var _ = require('lodash');

var uiStyles = {
  selected: {
    border: '1px solid #000000'
  },
  notSelected: {
    border: '1px solid #FFFFFF'
  }
};

module.exports = React.createClass({

  showCombos: function() {
    if(PaletteStore.selected() !== this.props.name) {
      return false;
    }
    var selectedSchemeVar = SchemeStore.selected();
    return selectedSchemeVar && SchemeStore.varIsCombo(selectedSchemeVar);
  },

  render: function() {
    var self = this;
    var
      combos,
      combosForColor = PaletteStore.combosForColor(this.props.name),
      selectedColor = SchemeStore.selectedColorName(),
      selectedFg = SchemeStore.selectedForegroundColorName();

    if(this.showCombos()) {
      combos = _.map(combosForColor, function(color) {
        var hex = PaletteStore.colorForName(color);
        var style = {
          background: self.props.value,
          color: hex,
        };
        style = _.extend(style, color === selectedFg ? uiStyles.selected : uiStyles.notSelected);

        function onClick(event) {
          self.handleComboClick(event, color);
        }
        return (
          <span className="combo" style={style} key={color} onClick={onClick}>{color}</span>
        );
      });
    }

    var style = {
      background: this.props.value,
      color: PaletteStore.colorForName(combosForColor[0])
    };
    style = _.extend(style, this.props.value === selectedColor ? uiStyles.selected : uiStyles.notSelected);

    return (
      <div style={style} className="swatch" onClick={this.handleClick}>
        <h6>{this.props.name}</h6>
        {combos}
      </div>
    );
  },
  handleClick: function() {
    var selectedSchemeVar = SchemeStore.selected();
    if(selectedSchemeVar) {
      if(SchemeStore.varIsCombo(selectedSchemeVar)) {
        Actions.selectSwatch(this.props.name);
      } else {
        Actions.setColor(this.props.name);
      }
    }
  },
  handleComboClick: function(event, fgColor) {
    event.stopPropagation();
    Actions.setCombo(this.props.name, fgColor);
  }

});
