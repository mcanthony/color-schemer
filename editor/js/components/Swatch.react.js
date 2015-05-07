//
// Copyright (c) 2015 by Mattermind Labs. All Rights Reserved.
//

var React = require('react');
var PaletteStore = require('../stores/PaletteStore');
var SchemeStore = require('../stores/SchemeStore');
var Actions = require('../actions');
// var colors = require('../../../lib/colors');
var _ = require('lodash');


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
    var combos;
    if(this.showCombos()) {
      combos = _.map(PaletteStore.combosForColor(this.props.name), function(color) {
        var style = {
          background: self.props.value,
          color: PaletteStore.colorForName(color)
        };
        function onClick(event) {
          self.handleComboClick(event, color);
        }
        return (
          <span className="combo" style={style} key={color} onClick={onClick}>{color}</span>
        );
      });
    }

    var style={
      background: this.props.value
    };

    return (
      <div style={style} className="swatch" onClick={this.handleClick}>
        <span>{this.props.name}</span>
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
