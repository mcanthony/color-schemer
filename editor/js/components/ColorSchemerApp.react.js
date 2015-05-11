//
// Copyright (c) 2015 by Mattermind Labs. All Rights Reserved.
//

var React = require('react');
var SchemeVars = require('./SchemeVars.react');
var Palette = require('./Palette.react');
var $ = require('jquery');
var Actions = require('../actions');


module.exports = React.createClass({

  componentDidMount: function() {
    $.get('/scheme', function(result) {
      Actions.setScheme(result.map, result.mapPath);
      Actions.setPalette(result.palette, result.palettePath);
    }
    ).fail(function(error) {
      console.error(error);
    });
  },

  render: function() {
    return (
      <div>
        <div className="scheme">
          <button onClick={Actions.save}>Save</button>
          <SchemeVars />
        </div>
        <div className="palette">
          <Palette />
        </div>
      </div>
    );
  }

});
