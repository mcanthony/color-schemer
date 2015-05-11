#!/usr/bin/env node

//
// Copyright (c) 2015 by Mattermind Labs. All Rights Reserved.
//

'use strict';

var pkg = require('./package.json');
var commands = require('./lib/commands');
var editor = require('./lib/editor');
var program = require('commander');
var opn = require('opn');

program.version(pkg.version);
program.usage('<command> [options]');


/**
 * paletton.xml -> palette.json
 * color-schemer convert paletton.xml > palette.json
 */
program
  .command('convert <inputFile>')
  .description('Convert a color scheme file from paletton.xml to a simple json format')
  .option('-f, --format [value]', 'Input format (default: paletton.com XML)')
  .action(function(file, options) {
    var out = commands.convert(file, options.format);
    console.log(out);
  });


/**
 * palette.json -> combos.json
 * color-schemer combos --threshold=3 palette.json > combos.json
 */
program
  .command('combos <jsonPalette>')
  .description('Given a color palette JSON file, generate readable color combinations using WCAG readability guidelines')
  .option('-t, --threshold [value]', 'WCAG readability threshold')
  .option('-g, --grays [value]', 'Add grays to palette')
  .action(function(palettePath, options) {
    var out = commands.makeCombos(palettePath, options.threshold, options.grays);
    console.log(out);
  });


/**
 * map.yaml (combos) -> scheme.json
 * map.yaml (combos) -> scheme.scss
 * color-schemer map scheme.yaml combos.json --format=json > scheme.json
 */
program
  .command('map <yamlMap> <jsonPalette>')
  .description('Export a color scheme from a yamlMap, mapping named values to colors using a JSON palette file')
  .option('-f, --format [value]', 'Output format')
  .action(function(yamlMap, jsonPalette, options) {
    var out = commands.mapScheme(yamlMap, jsonPalette, options.format);
    console.log(out);
  });


/**
 * color-schemer edit scheme.yaml combos.json
 */
program
  .command('edit <yamlMap> [jsonPalette]')
  .description('Edit a yaml map in a browser application.')
  .option('-p, --port [value]', 'Port default 8090')
  .action(function(yamlMap, jsonPalette, options) {
    var port = options.port || 8090;
    editor(yamlMap, jsonPalette, port);
    opn('http://127.0.0.1:' + port);
    console.log('ctrl-c to quit');
  });

program.parse(process.argv);
