# color-schemer [![Build Status](http://img.shields.io/travis/crucialfelix/color-schemer.svg?style=flat-square)](https://travis-ci.org/crucialfelix/color-schemer) [![Dependency Status](http://img.shields.io/gemnasium/crucialfelix/color-schemer.svg?style=flat-square)](https://gemnasium.com/crucialfelix/color-schemer)
> Edit semantic color schemes and export them as JSON, JS, SCSS, Objective-C

Work in progress. Not yet truly usable. Not pretty at all yet.

There are many color scheme generators and tools, but these all result in a palette of colors with names like "primary" "secondary".

color-schemer uses those palettes and then let's you assign them to semantic names specific to your application.

It lets you export those assigned variables as scss, js, json and h (objective-c header for iOS)

## Usage

Start by creating a yaml scheme file that specifies the variables you want to set, but with the values blank.

```yaml
scheme:
  container:
    bg:
    fg:
  primary:
    bg:
    fg:
  brush:
    bg:
    fg:
  debug:
```

Nested variables are combinations and will be exported as 'container-bg' 'container-fg'

Use a palette file in json format:

```json
{
  "primary-0": "#7E1939",
  "primary-1": "#D05A80",
  "primary-2": "#A7365A",
  "primary-3": "#52061E",
  "primary-4": "#2D000E",
  "secondary-1-0": "#130B00",
  "secondary-1-1": "#0A0600",
  "secondary-1-2": "#110A00",
  "secondary-1-3": "#251600",
  "secondary-1-4": "#301D01",
  "secondary-2-0": "#E8DCFD",
  "secondary-2-1": "#F2EBFF",
  "secondary-2-2": "#ECE2FE",
  "secondary-2-3": "#E6DBFA",
  "secondary-2-4": "#E7DFF7",
  "complement-0": "#5F764A",
  "complement-1": "#859B72",
  "complement-2": "#72895D",
  "complement-3": "#475C35",
  "complement-4": "#405D27"
}
```

Any json file with names and hex colors will work.

(This will be eventually be create-able and editable within the color-schemer editor)

Open the editor:

```sh
color-schemer edit scheme.yaml palette.json
```

The editor lets you select your names and then select the colors and color-combos from the palette.
Gray scale colors are automatically added.
Color combos are filtered for readability using `colorable`.

Click save to save your scheme file with the values now filled in.
The palette will be saved in the scheme file.

Export in a variety of formats

```sh
color-schemer export scheme.yaml --format=scss > _colors.scss
```

Nested variables are exported as:

```scss
$container-bg: '#FFFFFF';
$container-fg: '#111111';
```

json and js formats keep the combinations nested:

```json
{
  "container": {
    "bg": "#FFFFFF",
    "fg": "#111111"
  }
}
```

TODO: export to multiple formats on saving in the editor.
Then you can live reload web development, iOS development or react-native projects.

The .js format was specifically designed to be easily required by react-native for style sheets.


## Install

```sh
$ npm install --global color-schemer
```


## CLI


```sh
$ color-schemer --help

  Usage: color-schemer <command> [options]

  Commands:

    edit [options] <schemePath> [jsonPalette]  Edit scheme in web browser.
    export [options] <schemePath>           Export a color scheme from a YAML scheme, mapping named values to hex colors.
```


## License

MIT © [Chris Sattinger](https://github.com/crucialfelix)
