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
        new Tile("c-l", "--x---", null, null, "----"),
        new Tile("s-ac", "-x----", null, null, "----"),
        new Tile("c-d", "-----x", null, null, "----"),
      ],
      [
        new Tile("s-u", "x-----", null, null, "----"),
        new Tile("c-l", "--x---", null, null, "----"),
        new Tile("c-r-s-d", "x---x-", null, null, "r---"),
      ],
      [
        new Tile("s-u", "x-----", null, null, "----"),
        new Tile("s-u", "x-----", null, null, "----"),
        new Tile("s-u", "x-----", null, null, "----"),
      ],
      [
        new Tile("s-u", "x-----", null, null, "----"),
        new Tile("c-r", "---x--", null, null, "----"),
        new Tile("c-l-s-u", "x----x", null, null, "--s-"),
      ],
      [
        new Tile("c-l", "---x--", null, null, "----"),
        new Tile("s-ac", "-x----", null, null, "----"),
        new Tile("c-d", "----x-", null, null, "----"),
      ],
    ],
    // layouts[1]
    [
      [
        new Tile("c-l", "--x---", null, null, "----"),
        new Tile("s-ac", "-x----", null, null, "----"),
        new Tile("s-ac", "-x----", null, null, "----"),
        new Tile("c-d", "-----x", null, null, "----"),
      ],
      [
        new Tile("s", "x-----", null, null, "----"),
        new Tile("s-ac", "--x---", null, null, "----"),
        new Tile("s-ac", "-----x", null, null, "----"),
        new Tile("s", "x-----", null, null, "----"),
      ],
      [
        new Tile("s", "x-----", null, null, "----"),
        new Tile("s", "x-----", null, null, "----"),
        new Tile("s", "x--x--", null, null, "l---"),
        new Tile("s", "x----x", null, null, "--l-"),
      ],
      [
        new Tile("s", "x-----", null, null, "----"),
        new Tile("s", "x-----", null, null, "----"),
        new Tile("s", "x-x---", null, null, "--r-"),
        new Tile("s", "x---x-", null, null, "r---"),
      ],
      [
        new Tile("s", "x-----", null, null, "----"),
        new Tile("s-ac", "---x--", null, null, "----"),
        new Tile("s-ac", "----x-", null, null, "----"),
        new Tile("s", "x-----", null, null, "----"),
      ],
      [
        new Tile("c-l", "---x--", null, null, "----"),
        new Tile("s-ac", "-x----", null, null, "----"),
        new Tile("s-ac", "-x----", null, null, "----"),
        new Tile("c-d", "----x-", null, null, "----"),
      ],
    ],
    // layouts[1]
    [
      [
        new Tile("c-l", "--x---", null, null, "----"),
        new Tile("s-ac", "-x----", null, null, "----"),
        new Tile("s-ac", "-x----", null, null, "----"),
        new Tile("c-d", "-----x", null, null, "----"),
      ],
      [
        new Tile("s", "x-----", null, null, "----"),
        new Tile("s-ac", "--x---", null, null, "----"),
        new Tile("s-ac", "-----x", null, null, "----"),
        new Tile("s", "x-----", null, null, "----"),
      ],
      [
        new Tile("s", "x-----", null, null, "----"),
        new Tile("s", "x-----", null, null, "----"),
        new Tile("s", "x-xx--", null, null, "lrr-"),
        new Tile("s", "x---xx", null, null, "r-lr"),
      ],
      [
        new Tile("s", "x-----", null, null, "----"),
        new Tile("s", "x-----", null, null, "----"),
        new Tile("s", "x-----", null, null, "----"),
        new Tile("s", "x-----", null, null, "----"),
      ],
      [
        new Tile("s", "x-----", null, null, "----"),
        new Tile("s", "x-----", null, null, "----"),
        new Tile("s", "x-xx--", null, null, "srr-"),
        new Tile("s", "x---xx", null, null, "r-lr"),
      ],
      [
        new Tile("s", "x-----", null, null, "----"),
        new Tile("s-ac", "---x--", null, null, "----"),
        new Tile("s-ac", "----x-", null, null, "----"),
        new Tile("s", "x-----", null, null, "----"),
      ],
      [
        new Tile("c-l", "---x--", null, null, "----"),
        new Tile("s-ac", "-x----", null, null, "----"),
        new Tile("s-ac", "-x----", null, null, "----"),
        new Tile("c-d", "----x-", null, null, "----"),
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
