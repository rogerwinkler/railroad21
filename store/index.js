import { Tile } from "../helpers/Tile";

export const state = () => ({
  // output debug statements if "debug = true"
  debug: false,

  // Active page. One of "login", "home", "qr-payment", "card-admin"
  // and "card-application".
  currentPage: "Railroad21",

  menuItems: [
    { title: "Home", disabled: true },
    { title: "Start/Restart", disabled: true },
    { title: "Stop", disabled: true },
    { title: "Layout 1", disabled: true },
    { title: "Layout 2", disabled: true },
    { title: "Layout 3", disabled: true },
    { title: "Layout 4", disabled: true },
    { title: "Layout 5", disabled: true },
    { title: "Settings", disabled: true },
    { title: "Start", disabled: true },
    { title: "Stop", disabled: true },
    { title: "Continue", disabled: true },
  ],

  currentLayout: [],

  layouts: [
    // layouts[0]
    [
      [
        new Tile("--x---", null, null, "----"),
        new Tile("-x----", null, null, "----"),
        new Tile("-----x", null, null, "----"),
      ],
      [
        new Tile("x-----", null, null, "----"),
        new Tile("--x---", null, null, "----"),
        new Tile("x---x-", null, null, "r---"),
      ],
      [
        new Tile("x-----", null, null, "----"),
        new Tile("x-----", null, null, "----"),
        new Tile("x-----", null, null, "----"),
      ],
      [
        new Tile("x-----", null, null, "----"),
        new Tile("---x--", null, null, "----"),
        new Tile("x----x", null, null, "--s-"),
      ],
      [
        new Tile("---x--", null, null, "----"),
        new Tile("-x----", null, null, "----"),
        new Tile("----x-", null, null, "----"),
      ],
    ],
    // layouts[1]
    [
      [
        new Tile("--x---", null, null, "----"),
        new Tile("-x----", null, null, "----"),
        new Tile("-x----", null, null, "----"),
        new Tile("-----x", null, null, "----"),
      ],
      [
        new Tile("x-----", null, null, "----"),
        new Tile("--x---", null, null, "----"),
        new Tile("-----x", null, null, "----"),
        new Tile("x-----", null, null, "----"),
      ],
      [
        new Tile("x-----", null, null, "----"),
        new Tile("x-----", null, null, "----"),
        new Tile("x--x--", null, null, "l---"),
        new Tile("x----x", null, null, "--l-"),
      ],
      [
        new Tile("x-----", null, null, "----"),
        new Tile("x-----", null, null, "----"),
        new Tile("x-x---", null, null, "--r-"),
        new Tile("x---x-", null, null, "r---"),
      ],
      [
        new Tile("x-----", null, null, "----"),
        new Tile("---x--", null, null, "----"),
        new Tile("----x-", null, null, "----"),
        new Tile("x-----", null, null, "----"),
      ],
      [
        new Tile("---x--", null, null, "----"),
        new Tile("-x----", null, null, "----"),
        new Tile("-x----", null, null, "----"),
        new Tile("----x-", null, null, "----"),
      ],
    ],
    // layouts[2]
    [
      [
        new Tile("--x---", null, null, "----"),
        new Tile("-x----", null, null, "----"),
        new Tile("-x----", null, null, "----"),
        new Tile("-----x", null, null, "----"),
      ],
      [
        new Tile("x-----", null, null, "----"),
        new Tile("--x---", null, null, "----"),
        new Tile("-----x", null, null, "----"),
        new Tile("x-----", null, null, "----"),
      ],
      [
        new Tile("x-----", null, null, "----"),
        new Tile("x-----", null, null, "----"),
        new Tile("x-xx--", null, null, "lrr-"),
        new Tile("x---xx", null, null, "r-lr"),
      ],
      [
        new Tile("x-----", null, null, "----"),
        new Tile("x-----", null, null, "----"),
        new Tile("x-----", null, null, "----"),
        new Tile("x-----", null, null, "----"),
      ],
      [
        new Tile("x-----", null, null, "----"),
        new Tile("x-----", null, null, "----"),
        new Tile("x-xx--", null, null, "srr-"),
        new Tile("x---xx", null, null, "r-lr"),
      ],
      [
        new Tile("x-----", null, null, "----"),
        new Tile("---x--", null, null, "----"),
        new Tile("----x-", null, null, "----"),
        new Tile("x-----", null, null, "----"),
      ],
      [
        new Tile("---x--", null, null, "----"),
        new Tile("-x----", null, null, "----"),
        new Tile("-x----", null, null, "----"),
        new Tile("----x-", null, null, "----"),
      ],
    ],
    // layouts[3]
    [
      [
        new Tile("--x---", null, null, "----"),
        new Tile("-xx--x", null, null, "-sls"),
        new Tile("-xx--x", null, null, "-sls"),
        new Tile("-----x", null, null, "----"),
      ],
      [
        new Tile("x-xx--", null, null, "sls-"),
        new Tile("x-xxxx", null, null, "slsl"),
        new Tile("x-xxxx", null, null, "slsl"),
        new Tile("x---xx", null, null, "s-sr"),
      ],
      [
        new Tile("x-xx--", null, null, "sls-"),
        new Tile("x---xx", null, null, "s-sl"),
        new Tile("x-xx--", null, null, "lrs-"),
        new Tile("x---xx", null, null, "s-sr"),
      ],
      [
        new Tile("x-----", null, null, "----"),
        new Tile("x-xx--", null, null, "srs-"),
        new Tile("x---xx", null, null, "s-sr"),
        new Tile("x-----", null, null, "----"),
      ],
      [
        new Tile("x-xx--", null, null, "srs-"),
        new Tile("x---xx", null, null, "s-sl"),
        new Tile("x-xx--", null, null, "srr-"),
        new Tile("x---xx", null, null, "r-lr"),
      ],
      [
        new Tile("x-----", null, null, "----"),
        new Tile("--xx--", null, null, "-l--"),
        new Tile("----xx", null, null, "---r"),
        new Tile("x-----", null, null, "----"),
      ],
      [
        new Tile("---x--", null, null, "----"),
        new Tile("-x--x-", null, null, "---l"),
        new Tile("-x-x--", null, null, "-r--"),
        new Tile("----x-", null, null, "----"),
      ],
    ],
    // layout[4]
    [
      [
        new Tile("--x---", null, null, "----"),
        new Tile("-x----", null, null, "----"),
        new Tile("-x----", null, null, "----"),
        new Tile("-x----", null, null, "----"),
        new Tile("-xx--x", null, null, "-slr"),
        new Tile("-x----", null, null, "----"),
        new Tile("-x----", null, null, "----"),
        new Tile("-x----", null, null, "----"),
        new Tile("-----x", null, null, "----"),
      ],
      [
        new Tile("x-----", null, null, "----"),
        new Tile("--x---", null, null, "----"),
        new Tile("-x----", null, null, "----"),
        new Tile("-x----", null, null, "----"),
        new Tile("xx----", null, null, "----"),
        new Tile("-x----", null, null, "----"),
        new Tile("-x----", null, null, "----"),
        new Tile("-x----", null, null, "----"),
        new Tile("----x-", null, null, "----"),
      ],
      [
        new Tile("x-----", null, null, "----"),
        new Tile("x--x--", null, null, "s---"),
        new Tile("-x----", null, null, "----"),
        new Tile("-x----", null, null, "----"),
        new Tile("xx----", null, null, "----"),
        new Tile("-x----", null, null, "----"),
        new Tile("-x----", null, null, "----"),
        new Tile("-x----", null, null, "----"),
        new Tile("-----x", null, null, "----"),
      ],
      [
        new Tile("x-xx--", null, null, "slr-"),
        new Tile("xx----", null, null, "----"),
        new Tile("-x----", null, null, "----"),
        new Tile("-x----", null, null, "----"),
        new Tile("xx----", null, null, "----"),
        new Tile("-x----", null, null, "----"),
        new Tile("-xx--x", null, null, "-srr"),
        new Tile("-x----", null, null, "----"),
        new Tile("----x-", null, null, "----"),
      ],
      [
        new Tile("x-----", null, null, "----"),
        new Tile("x-x---", null, null, "--r-"),
        new Tile("-x----", null, null, "----"),
        new Tile("-----x", null, null, "----"),
        new Tile("x-----", null, null, "----"),
        new Tile("--x---", null, null, "----"),
        new Tile("xx----", null, null, "----"),
        new Tile("-x----", null, null, "----"),
        new Tile("-----x", null, null, "----"),
      ],
      [
        new Tile("x-----", null, null, "----"),
        new Tile("x-----", null, null, "----"),
        new Tile("--x---", null, null, "----"),
        new Tile("----x-", null, null, "----"),
        new Tile("x-----", null, null, "----"),
        new Tile("x-----", null, null, "----"),
        new Tile("x-----", null, null, "----"),
        new Tile("--x---", null, null, "----"),
        new Tile("x---x-", null, null, "r---"),
      ],
      [
        new Tile("x-----", null, null, "----"),
        new Tile("x-----", null, null, "----"),
        new Tile("---x--", null, null, "----"),
        new Tile("-x----", null, null, "----"),
        new Tile("----x-", null, null, "----"),
        new Tile("x-----", null, null, "----"),
        new Tile("x-----", null, null, "----"),
        new Tile("x-----", null, null, "----"),
        new Tile("x-----", null, null, "----"),
      ],
      [
        new Tile("---x--", null, null, "----"),
        new Tile("----x-", null, null, "----"),
        new Tile("------", null, null, "----"),
        new Tile("------", null, null, "----"),
        new Tile("------", null, null, "----"),
        new Tile("---x--", null, null, "----"),
        new Tile("----x-", null, null, "----"),
        new Tile("---x--", null, null, "----"),
        new Tile("----x-", null, null, "----"),
      ],
    ],
  ],
});

// -----------------------------------------------------------

export const mutations = {
  updateSwitchState(state, payload) {
    if (state.debug) {
      console.log("store::index.js::updateSwitchState::payload=", payload);
    }
    state.currentLayout[payload.row][payload.col].switchState =
      payload.switchState;
  },
  setCurrentLayout(state, layoutNo) {
    if (state.debug) {
      console.log("store::index.js::setCurrentLayout::layoutNo=", layoutNo);
    }
    state.currentLayout = state.layouts[layoutNo];
  },

  setCurrentPage(state, page) {
    if (state.debug) {
      console.log("store::index.js::setIsIndexPage::page=", page);
    }
    state.currentPage = page;
  },

  enableMenuItem(state, index) {
    if (state.debug) {
      console.log("store::index.js::enableMenuItem:index=", index);
    }
    state.menuItems[index].disabled = false;
  },

  disableMenuItem(state, index) {
    if (state.debug) {
      console.log("store::index.js::disableMenuItem:index=", index);
    }
    state.menuItems[index].disabled = true;
  },

  enableAllMenuItems(state) {
    if (state.debug) {
      console.log("store::index.js::enableAllMenuItems");
    }
    for (let i = 0; i < state.menuItems.length; i++) {
      state.menuItems[i].disabled = false;
    }
  },

  disableAllMenuItems(state) {
    if (state.debug) {
      console.log("store::index.js::disableAllMenuItems");
    }
    for (let i = 0; i < state.menuItems.length; i++) {
      state.menuItems[i].disabled = true;
    }
  },
};

// -----------------------------------------------------------
