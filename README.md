# Railroad21

_Railroad21_ is railroad game. As a PWA it can be attached to mobile's homescreens or run in the browser.

## Status

| Item            | Description                                   |
| --------------- | --------------------------------------------- |
| Current Version | 0.1.0                                         |
| Status          | Experimental, build up, game not yet playable |

#### Quick Links

- [Build Setup](#build-setup)
- [Architecture and Software Stack](#architecture-and-software-stack)
- [Roadmap](#roadmap)
- [Resources](#resources)
  - [Logo Design](#logo-design)
  - [Color Palette](#color-palette)
- [License](#license)

## Build Setup

```bash
# install dependencies
$ yarn install

# serve with hot reload at localhost:3000
$ yarn dev

# build for production and launch server
$ yarn build
$ yarn start

# generate static project
$ yarn generate
```

## Architecture and Software Stack

_Railroad21_ is built with [Nuxt](https://nuxtjs.org/) and [Vuetify](https://vuetifyjs.com/en/). It's built so that it can be statically served from any web server.

## Roadmap

_**Note**: This roadmap is subject to change. Functionalities may be added, removed, changed or reprioritized. Also functionalities may be moved between releases._

### Release 1.0

- Game basics.
- Simple images and graphics to represent locomotives, wagons, tracks and symbols. Quick and dirty approach.
- The game will provide simple, standard layouts (only few).
- One (none) or only a few game levels.
- Control only through traffic lights (stop & go).
- Limited to two trains with two different speeds and two different lengths.

### Release 1.1

- Add more game levels, more layouts, more complex layouts.
- Track switches are introduced to steer the trains.
- Allow more trains.

### Release 1.2

- Introduce control through power switches. Definition of track segments. Power in segments may be controlled by power switches.
- Color of trackes changes according to power is on or off.

### Release 1.3

- Add sound and motion (vibrations) to enhance UX.

### Release 1.4

- Allow the user to edit train compositions. Select from various locomotives (with different speeds) and wagons (different types, lengths etc.).

### Release 2.0

- Introduce track layout build system (Lego-like) so that the player may define and use his own layouts.

### Release 2.1

- Layout Export/Import to/from files so that players may trade layouts.

### Release 3.0

- Introduce vehicle traffic and railroad crossings.

## Resources

### Logo Design

_Railroad21_'s logos were defined with [Inkscape 1.0.1](https://inkscape.org/). Many thanks go out to the authors of such wonderful FOSS.

The font used for the `RAILROAD21` string is _GFS Baskerville_. Enhanced character spacing applied.

### Color Palette

This is _Railroad21_'s color palette...

![Railroad21 Color Palette](./static/img/r21-color-palette.png)

It can be looked up in the [Vuetify](https://vuetifyjs.com/) theme definition in `nuxt.config.js`...

```js
{
  primary:   '#630a10',
  secondary: '#fcf0c8',
  accent:    '#910f17',
  error:     '#919f17',
  info:      '#fcf0c8',
  success:   '#350509',
  warning:   '#f9e398',
}
```

The palette is also defined as global SASS variables in the file `assets/variables.scss`...

```scss
$r21-col-primary: #630a10;
$r21-col-secondary: #fcf0c8;
$r21-col-accent: #910f17;
$r21-col-error: #919f17;
$r21-col-info: #fcf0c8;
$r21-col-success: #350509;
$r21-col-warning: #f9e398;
```

## License

MIT License (see LICENSE file).
