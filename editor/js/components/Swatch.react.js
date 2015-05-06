//
// Copyright (c) 2015 by Mattermind Labs. All Rights Reserved.
//

var React = require('react');
var PaletteStore = require('../stores/PaletteStore');
// var colors = require('../../../lib/colors');
var _ = require('lodash');



module.exports = React.createClass({

  render: function() {
    var self = this;
    var combos = _.map(PaletteStore.combosForColor(this.props.name), function(color) {
      var style = {
        background: self.props.value,
        color: PaletteStore.colorForName(color)
      };
      return (
        <span className="combo" style={style} key={color}>{color}</span>
      );
    });

    var style={
      background: this.props.value
    };

    return (
      <div style={style} className="swatch">
        <span>{this.props.name}</span>
        {combos}
      </div>
    );
  }

});
