import { Tile } from '../helpers/Tile';

export const state = () => ({
  // output debug statements if "debug = true"
  debug: false,

  // Active page. One of "login", "home", "qr-payment", "card-admin"
  // and "card-application".
  currentPage: 'Railroad21',

  menuItems: [
    { title: 'Home', disabled: true },
    { title: 'Reset', disabled: true },
    { title: 'Start / Continue', disabled: true },
    { title: 'Stop / Pause', disabled: true },
    { title: 'Settings', disabled: true },
  ],

  currentSpeed: null,

  speeds: [
    { name: 'very slow', intervalInMs: 20, distPerIntervalInPx: 1 },
    { name: 'slow', intervalInMs: 10, distPerIntervalInPx: 1 },
    { name: 'normal', intervalInMs: 10, distPerIntervalInPx: 2 },
    { name: 'fast', intervalInMs: 10, distPerIntervalInPx: 3 },
    { name: 'very fast', intervalInMs: 6, distPerIntervalInPx: 3 },
    { name: 'hyper speed', intervalInMs: 6, distPerIntervalInPx: 5 },
  ],

  currentNoOfTrains: 1,

  noOfTrains: [1, 2, 3, 4, 5],

  currentLayout: [],

  layouts: [
    // layouts[0]
    [
      [
        new Tile('--x---', null, null, '----'),
        new Tile('-x----', null, null, '----'),
        new Tile('-----x', null, null, '----'),
      ],
      [
        new Tile('x-----', null, null, '----'),
        new Tile('--x---', null, null, '----'),
        new Tile('x---x-', null, null, 'r---'),
      ],
      [
        new Tile('x-----', null, null, '----'),
        new Tile('x-----', null, null, '----'),
        new Tile('x-----', null, null, '----'),
      ],
      [
        new Tile('x-----', null, null, '----'),
        new Tile('---x--', null, null, '----'),
        new Tile('x----x', null, null, '--s-'),
      ],
      [
        new Tile('---x--', null, null, '----'),
        new Tile('-x----', null, null, '----'),
        new Tile('----x-', null, null, '----'),
      ],
    ],
    // layouts[1]
    [
      [
        new Tile('--x---', null, null, '----'),
        new Tile('-xx--x', null, null, '-srs'),
        new Tile('-----x', null, null, '----'),
      ],
      [
        new Tile('x-----', null, null, '----'),
        new Tile('x-xx--', null, null, 'srs-'),
        new Tile('x---x-', null, null, 'r---'),
      ],
      [
        new Tile('--xx--', null, null, '-r--'),
        new Tile('-x--x-', null, null, '---s'),
        new Tile('x---xx', null, null, 's-sr'),
      ],
      [
        new Tile('--xx--', null, null, '-r--'),
        new Tile('-----x', null, null, '----'),
        new Tile('x-----', null, null, '----'),
      ],
      [
        new Tile('---x--', null, null, '----'),
        new Tile('---xx-', null, null, 'r---'),
        new Tile('----x-', null, null, '----'),
      ],
    ],
    // layouts[2]
    [
      [
        new Tile('--x---', null, null, '----'),
        new Tile('-xx--x', null, null, '-srs'),
        new Tile('-----x', null, null, '----'),
      ],
      [
        new Tile('x-----', null, null, '----'),
        new Tile('x-xx--', null, null, 'srs-'),
        new Tile('x---x-', null, null, 'r---'),
      ],
      [
        new Tile('--xx--', null, null, '-r--'),
        new Tile('-xx-x-', null, null, '-l-s'),
        new Tile('x---xx', null, null, 's-sr'),
      ],
      [
        new Tile('--xx--', null, null, '-r--'),
        new Tile('x---xx', null, null, 's-ll'),
        new Tile('x-----', null, null, '----'),
      ],
      [
        new Tile('---x--', null, null, '----'),
        new Tile('---xx-', null, null, 'r---'),
        new Tile('----x-', null, null, '----'),
      ],
    ],
    // layouts[3]
    [
      [
        new Tile('--x---', null, null, '----'),
        new Tile('--x--x', null, null, '--l-'),
        new Tile('-----x', null, null, '----'),
      ],
      [
        new Tile('--xx--', null, null, '-l--'),
        new Tile('--xxxx', null, null, 'llll'),
        new Tile('----xx', null, null, '---l'),
      ],
      [
        new Tile('--xx--', null, null, '-l--'),
        new Tile('--xxxx', null, null, 'llll'),
        new Tile('----xx', null, null, '---l'),
      ],
      [
        new Tile('--xx--', null, null, '-l--'),
        new Tile('--xxxx', null, null, 'llll'),
        new Tile('----xx', null, null, '---l'),
      ],
      [
        new Tile('---x--', null, null, '----'),
        new Tile('---xx-', null, null, 'l---'),
        new Tile('----x-', null, null, '----'),
      ],
    ],
    // layouts[4]
    [
      [
        new Tile('--x---', null, null, '----'),
        new Tile('-xx--x', null, null, '-sls'),
        new Tile('-----x', null, null, '----'),
      ],
      [
        new Tile('x-xx--', null, null, 'sls-'),
        new Tile('-xxxxx', null, null, 'llll'),
        new Tile('x---xx', null, null, 's-sl'),
      ],
      [
        new Tile('x-xx--', null, null, 'sls-'),
        new Tile('-xxxxx', null, null, 'llll'),
        new Tile('x---xx', null, null, 's-sl'),
      ],
      [
        new Tile('x-xx--', null, null, 'sls-'),
        new Tile('-xxxxx', null, null, 'llll'),
        new Tile('x---xx', null, null, 's-sl'),
      ],
      [
        new Tile('---x--', null, null, '----'),
        new Tile('-x-xx-', null, null, 'ls-s'),
        new Tile('----x-', null, null, '----'),
      ],
    ],
    // layouts[5]
    [
      [
        new Tile('--x---', null, null, '----'),
        new Tile('-x----', null, null, '----'),
        new Tile('-x----', null, null, '----'),
        new Tile('-----x', null, null, '----'),
      ],
      [
        new Tile('x-----', null, null, '----'),
        new Tile('--x---', null, null, '----'),
        new Tile('-----x', null, null, '----'),
        new Tile('x-----', null, null, '----'),
      ],
      [
        new Tile('x-----', null, null, '----'),
        new Tile('x-----', null, null, '----'),
        new Tile('x--x--', null, null, 'l---'),
        new Tile('x----x', null, null, '--l-'),
      ],
      [
        new Tile('x-----', null, null, '----'),
        new Tile('x-----', null, null, '----'),
        new Tile('x-x---', null, null, '--r-'),
        new Tile('x---x-', null, null, 'r---'),
      ],
      [
        new Tile('x-----', null, null, '----'),
        new Tile('---x--', null, null, '----'),
        new Tile('----x-', null, null, '----'),
        new Tile('x-----', null, null, '----'),
      ],
      [
        new Tile('---x--', null, null, '----'),
        new Tile('-x----', null, null, '----'),
        new Tile('-x----', null, null, '----'),
        new Tile('----x-', null, null, '----'),
      ],
    ],
    // layouts[6]
    [
      [
        new Tile('--x---', null, null, '----'),
        new Tile('-x----', null, null, '----'),
        new Tile('-x----', null, null, '----'),
        new Tile('-----x', null, null, '----'),
      ],
      [
        new Tile('x-----', null, null, '----'),
        new Tile('--x---', null, null, '----'),
        new Tile('-----x', null, null, '----'),
        new Tile('x-----', null, null, '----'),
      ],
      [
        new Tile('x-----', null, null, '----'),
        new Tile('x-----', null, null, '----'),
        new Tile('x-xx--', null, null, 'lrr-'),
        new Tile('x---xx', null, null, 'r-lr'),
      ],
      [
        new Tile('x-xx--', null, null, 'srs-'),
        new Tile('x---xx', null, null, 's-sr'),
        new Tile('x-----', null, null, '----'),
        new Tile('x-----', null, null, '----'),
      ],
      [
        new Tile('x-----', null, null, '----'),
        new Tile('x-----', null, null, '----'),
        new Tile('x-xx--', null, null, 'srr-'),
        new Tile('x---xx', null, null, 'r-lr'),
      ],
      [
        new Tile('x-----', null, null, '----'),
        new Tile('---x--', null, null, '----'),
        new Tile('----x-', null, null, '----'),
        new Tile('x-----', null, null, '----'),
      ],
      [
        new Tile('---x--', null, null, '----'),
        new Tile('-x----', null, null, '----'),
        new Tile('-x----', null, null, '----'),
        new Tile('----x-', null, null, '----'),
      ],
    ],
    // layouts[7]
    [
      [
        new Tile('------', null, null, '----'),
        new Tile('--x---', null, null, '----'),
        new Tile('-xx---', null, null, '-s--'),
        new Tile('-----x', null, null, '----'),
      ],
      [
        new Tile('--x---', null, null, '----'),
        new Tile('--x-x-', null, null, '----'),
        new Tile('x----x', null, null, '--l-'),
        new Tile('x-----', null, null, '----'),
      ],
      [
        new Tile('--xx--', null, null, '-r--'),
        new Tile('x---xx', null, null, 's-sr'),
        new Tile('x--x--', null, null, 's---'),
        new Tile('----x-', null, null, '----'),
      ],
      [
        new Tile('x-----', null, null, '----'),
        new Tile('---x--', null, null, '----'),
        new Tile('xx--x-', null, null, 's--l'),
        new Tile('-----x', null, null, '----'),
      ],
      [
        new Tile('x-----', null, null, '----'),
        new Tile('------', null, null, '----'),
        new Tile('x-x---', null, null, '--r-'),
        new Tile('----x-', null, null, '----'),
      ],
      [
        new Tile('x-----', null, null, '----'),
        new Tile('--x---', null, null, '----'),
        new Tile('---x-x', null, null, '----'),
        new Tile('-----x', null, null, '----'),
      ],
      [
        new Tile('---x--', null, null, '----'),
        new Tile('----x-', null, null, '----'),
        new Tile('---x--', null, null, '----'),
        new Tile('----x-', null, null, '----'),
      ],
    ],
    // layouts[8]
    [
      [
        new Tile('--x---', null, null, '----'),
        new Tile('-xx--x', null, null, '-sls'),
        new Tile('-xx--x', null, null, '-sls'),
        new Tile('-----x', null, null, '----'),
      ],
      [
        new Tile('x-xx--', null, null, 'sls-'),
        new Tile('x-xxxx', null, null, 'slsl'),
        new Tile('x-xxxx', null, null, 'slsl'),
        new Tile('x---xx', null, null, 's-sr'),
      ],
      [
        new Tile('x-xx--', null, null, 'sls-'),
        new Tile('x---xx', null, null, 's-sl'),
        new Tile('x-xx--', null, null, 'lrs-'),
        new Tile('x---xx', null, null, 's-sr'),
      ],
      [
        new Tile('x-----', null, null, '----'),
        new Tile('x-xx--', null, null, 'srs-'),
        new Tile('x---xx', null, null, 's-sr'),
        new Tile('x-----', null, null, '----'),
      ],
      [
        new Tile('x-xx--', null, null, 'srs-'),
        new Tile('x---xx', null, null, 's-sl'),
        new Tile('x-xx--', null, null, 'srr-'),
        new Tile('x---xx', null, null, 'r-lr'),
      ],
      [
        new Tile('x-----', null, null, '----'),
        new Tile('--xx--', null, null, '-l--'),
        new Tile('----xx', null, null, '---r'),
        new Tile('x-----', null, null, '----'),
      ],
      [
        new Tile('---x--', null, null, '----'),
        new Tile('-x--x-', null, null, '---l'),
        new Tile('-x-x--', null, null, '-r--'),
        new Tile('----x-', null, null, '----'),
      ],
    ],
    // layout[9]
    [
      [
        new Tile('--x---', null, null, '----'),
        new Tile('-x----', null, null, '----'),
        new Tile('-x----', null, null, '----'),
        new Tile('-x----', null, null, '----'),
        new Tile('-xx--x', null, null, '-slr'),
        new Tile('-x----', null, null, '----'),
        new Tile('-x----', null, null, '----'),
        new Tile('-x----', null, null, '----'),
        new Tile('-----x', null, null, '----'),
      ],
      [
        new Tile('x-----', null, null, '----'),
        new Tile('--x---', null, null, '----'),
        new Tile('-x----', null, null, '----'),
        new Tile('-x----', null, null, '----'),
        new Tile('xx----', null, null, '----'),
        new Tile('-x----', null, null, '----'),
        new Tile('-x----', null, null, '----'),
        new Tile('-x----', null, null, '----'),
        new Tile('----x-', null, null, '----'),
      ],
      [
        new Tile('x-----', null, null, '----'),
        new Tile('x--x--', null, null, 's---'),
        new Tile('-x----', null, null, '----'),
        new Tile('-x----', null, null, '----'),
        new Tile('xx----', null, null, '----'),
        new Tile('-x----', null, null, '----'),
        new Tile('-x----', null, null, '----'),
        new Tile('-x----', null, null, '----'),
        new Tile('-----x', null, null, '----'),
      ],
      [
        new Tile('x-xx--', null, null, 'slr-'),
        new Tile('xx----', null, null, '----'),
        new Tile('-x----', null, null, '----'),
        new Tile('-x----', null, null, '----'),
        new Tile('xx----', null, null, '----'),
        new Tile('-x----', null, null, '----'),
        new Tile('-xx--x', null, null, '-srr'),
        new Tile('-x----', null, null, '----'),
        new Tile('----x-', null, null, '----'),
      ],
      [
        new Tile('x-----', null, null, '----'),
        new Tile('x-x---', null, null, '--r-'),
        new Tile('-x----', null, null, '----'),
        new Tile('-----x', null, null, '----'),
        new Tile('x-----', null, null, '----'),
        new Tile('--x---', null, null, '----'),
        new Tile('xx----', null, null, '----'),
        new Tile('-x----', null, null, '----'),
        new Tile('-----x', null, null, '----'),
      ],
      [
        new Tile('x-----', null, null, '----'),
        new Tile('x-----', null, null, '----'),
        new Tile('--x---', null, null, '----'),
        new Tile('----x-', null, null, '----'),
        new Tile('x-----', null, null, '----'),
        new Tile('x-----', null, null, '----'),
        new Tile('x-----', null, null, '----'),
        new Tile('--x---', null, null, '----'),
        new Tile('x---x-', null, null, 'r---'),
      ],
      [
        new Tile('x-----', null, null, '----'),
        new Tile('x-----', null, null, '----'),
        new Tile('---x--', null, null, '----'),
        new Tile('-x----', null, null, '----'),
        new Tile('----x-', null, null, '----'),
        new Tile('x-----', null, null, '----'),
        new Tile('x-----', null, null, '----'),
        new Tile('x-----', null, null, '----'),
        new Tile('x-----', null, null, '----'),
      ],
      [
        new Tile('---x--', null, null, '----'),
        new Tile('----x-', null, null, '----'),
        new Tile('------', null, null, '----'),
        new Tile('------', null, null, '----'),
        new Tile('------', null, null, '----'),
        new Tile('---x--', null, null, '----'),
        new Tile('----x-', null, null, '----'),
        new Tile('---x--', null, null, '----'),
        new Tile('----x-', null, null, '----'),
      ],
    ],
  ],
});

// -----------------------------------------------------------

export const mutations = {
  setCurrentNoOfTrains(state, noOfTrains) {
    if (state.debug) {
      console.log(
        'store::index.js::setCurrentNoOfTrains::noOfTrains=',
        noOfTrains
      );
    }
    state.currentNoOfTrains = noOfTrains;
  },

  setCurrentSpeed(state, speed) {
    if (state.debug) {
      console.log('store::index.js::setCurrentSpeed::speed=', speed);
    }
    state.currentSpeed = speed;
  },

  updateSwitchState(state, payload) {
    if (state.debug) {
      console.log('store::index.js::updateSwitchState::payload=', payload);
    }
    state.currentLayout[payload.row][payload.col].switchState =
      payload.switchState;
  },
  setCurrentLayout(state, layoutNo) {
    if (state.debug) {
      console.log('store::index.js::setCurrentLayout::layoutNo=', layoutNo);
    }
    state.currentLayout = state.layouts[layoutNo];
  },

  setCurrentPage(state, page) {
    if (state.debug) {
      console.log('store::index.js::setIsIndexPage::page=', page);
    }
    state.currentPage = page;
  },

  enableMenuItem(state, index) {
    if (state.debug) {
      console.log('store::index.js::enableMenuItem:index=', index);
    }
    state.menuItems[index].disabled = false;
  },

  disableMenuItem(state, index) {
    if (state.debug) {
      console.log('store::index.js::disableMenuItem:index=', index);
    }
    state.menuItems[index].disabled = true;
  },

  enableAllMenuItems(state) {
    if (state.debug) {
      console.log('store::index.js::enableAllMenuItems');
    }
    for (let i = 0; i < state.menuItems.length; i++) {
      state.menuItems[i].disabled = false;
    }
  },

  disableAllMenuItems(state) {
    if (state.debug) {
      console.log('store::index.js::disableAllMenuItems');
    }
    for (let i = 0; i < state.menuItems.length; i++) {
      state.menuItems[i].disabled = true;
    }
  },
};

// -----------------------------------------------------------
