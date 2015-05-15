'use strict';

var files = require('../lib/files.js');


var doc = '<palette><url>http://paletton.com/#uid=65f1g1kNihpRU8TP2dWBMmHrDrWkh7rJk7BmiZuLggmFedi2k0B7R1adm0Pab1E7u3H3jk8DqW0RS249zrdMlAjHgi</url><colorset id="primary" title="Primary color">        <color id="primary-0" nr="0" rgb="740037" r="116" g="0" b="55" r0="0.455" g0="0" b0="0.216"/>        <color id="primary-1" nr="1" rgb="3B001C" r="59" g="0" b="28" r0="0.231" g0="0" b0="0.11"/>        <color id="primary-2" nr="2" rgb="5D002C" r="93" g="0" b="44" r0="0.365" g0="0" b0="0.173"/>        <color id="primary-3" nr="3" rgb="970047" r="151" g="0" b="71" r0="0.592" g0="0" b0="0.278"/>        <color id="primary-4" nr="4" rgb="BA1965" r="186" g="25" b="101" r0="0.729" g0="0.098" b0="0.396"/>    </colorset>    <colorset id="secondary-1" title="Secondary color (1)">        <color id="secondary-1-0" nr="0" rgb="3F3E3D" r="63" g="62" b="61" r0="0.247" g0="0.243" b0="0.239"/>        <color id="secondary-1-1" nr="1" rgb="6A6967" r="106" g="105" b="103" r0="0.416" g0="0.412" b0="0.404"/>        <color id="secondary-1-2" nr="2" rgb="51504F" r="81" g="80" b="79" r0="0.318" g0="0.314" b0="0.31"/>        <color id="secondary-1-3" nr="3" rgb="3C3A38" r="60" g="58" b="56" r0="0.235" g0="0.227" b0="0.22"/>        <color id="secondary-1-4" nr="4" rgb="1A1917" r="26" g="25" b="23" r0="0.102" g0="0.098" b0="0.09"/>    </colorset>    <colorset id="secondary-2" title="Secondary color (2)">        <color id="secondary-2-0" nr="0" rgb="747496" r="116" g="116" b="150" r0="0.455" g0="0.455" b0="0.588"/>        <color id="secondary-2-1" nr="1" rgb="E4E4EA" r="228" g="228" b="234" r0="0.894" g0="0.894" b0="0.918"/>        <color id="secondary-2-2" nr="2" rgb="A6A6BB" r="166" g="166" b="187" r0="0.651" g0="0.651" b0="0.733"/>        <color id="secondary-2-3" nr="3" rgb="4C4C78" r="76" g="76" b="120" r0="0.298" g0="0.298" b0="0.471"/>        <color id="secondary-2-4" nr="4" rgb="2B2B5B" r="43" g="43" b="91" r0="0.169" g0="0.169" b0="0.357"/>    </colorset>    <colorset id="complement" title="Complement color">        <color id="complement-0" nr="0" rgb="A1CC5F" r="161" g="204" b="95" r0="0.631" g0="0.8" b0="0.373"/>        <color id="complement-1" nr="1" rgb="B4EF59" r="180" g="239" b="89" r0="0.706" g0="0.937" b0="0.349"/>        <color id="complement-2" nr="2" rgb="ADE25C" r="173" g="226" b="92" r0="0.678" g0="0.886" b0="0.361"/>        <color id="complement-3" nr="3" rgb="85A652" r="133" g="166" b="82" r0="0.522" g0="0.651" b0="0.322"/>        <color id="complement-4" nr="4" rgb="6D844A" r="109" g="132" b="74" r0="0.427" g0="0.518" b0="0.29"/>    </colorset></palette>';

describe('parsePaletton', function() {
  it('should convert xml to dict', function() {
    var result = files.parsePaletton(doc);
    expect(result['primary-0']).toBe('#740037');
  });
});



describe('formatOutput', function() {
  var scheme = {one: '#111111', 'two-bg': '#222222', 'three': null, 'four': undefined};

  it('json', function() {
    var result = files.formatOutput(scheme, 'json');
    expect(result).toBeDefined();
  });

  it('js', function() {
    var result = files.formatOutput(scheme, 'js');
    expect(result).toBeDefined();
  });

  it('yaml', function() {
    var result = files.formatOutput(scheme, 'yaml');
    expect(result).toBeDefined();
    expect(result.indexOf('null')).toBe(-1);
  });

  it('scss', function() {
    var result = files.formatOutput(scheme, 'scss');
    expect(result).toBeDefined();
    expect(result.indexOf('null')).toBe(-1);
    expect(result.indexOf('undefined')).toBe(-1);
  });
});
