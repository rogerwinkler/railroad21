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
  ],
});

// -----------------------------------------------------------

export const mutations = {
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
