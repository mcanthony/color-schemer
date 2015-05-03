#!/usr/bin/env node
'use strict';

var pkg = require('./package.json');
var colorSchemer = require('./');
var program = require('commander');

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
    var out = colorSchemer.convert(file, options.format);
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
    var out = colorSchemer.makeCombos(palettePath, options.threshold, options.grays);
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
    var out = colorSchemer.mapScheme(yamlMap, jsonPalette, options.format);
    console.log(out);
  });

program.parse(process.argv);
