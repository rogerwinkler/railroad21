<template>
  <v-app>
    <v-app-bar absolute app color="primary" dark>
      <img
        id="img-logo"
        class="img-logo"
        src="img/r21-logo-trans.svg"
        alt="Logsem logo"
        height="40px"
      />
      <v-spacer />
      <!-- <v-toolbar-title>{{ $t(title) }}</v-toolbar-title> -->
      <v-toolbar-title class="secondary--text">{{ title }}</v-toolbar-title>
      <v-spacer />
      <v-menu
        transition="slide-y-transition"
        v-model="shown"
        :close-on-click="true"
        :close-on-content-click="true"
        nudge-bottom="40"
      >
        <template v-slot:activator="{ on }">
          <v-app-bar-nav-icon class="mxnavicon secondary--text" v-on="on" />
        </template>

        <v-list>
          <v-list-item
            v-for="(item, index) in items"
            :key="index"
            @click.stop="menuItemClicked(index)"
            :disabled="item.disabled"
          >
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>
    <v-main>
      <v-container>
        <nuxt />
      </v-container>
    </v-main>
    <v-footer
      class="vfooter secondary--text"
      fixed
      app
      color="primary"
      dark
      height="50px"
    >
      <v-spacer />
      <span>&copy; {{ new Date().getFullYear() }} Roger Winkler</span>
      <v-spacer />
    </v-footer>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      shown: false,
      locale: this.$store.state.locale,
    };
  },

  computed: {
    items() {
      return this.$store.state.menuItems;
    },

    title() {
      return this.$store.state.currentPage;
    },
  },

  methods: {
    menuItemClicked(itemNo) {
      // console.log("menuItemClicked::itemNo=", itemNo);
      switch (itemNo) {
        case 0:
          // home
          this.$router.push("/");
          break;
        case 1:
          this.$root.$emit("restart");
          break;
        case 2:
          this.$root.$emit("stop");
          break;
        case 3:
          this.$root.$emit("layoutchanged", 1);
          break;
        case 4:
          this.$root.$emit("layoutchanged", 2);
          break;
        case 5:
          this.$root.$emit("layoutchanged", 3);
          break;
        case 6:
          this.$root.$emit("layoutchanged", 4);
          break;
        case 7:
          this.$root.$emit("layoutchanged", 5);
          break;
        case 8:
          this.$router.push("/settings");
          break;
        case 9:
          this.$root.$emit("settingsstart");
          break;
        case 10:
          this.$root.$emit("settingsstop");
          break;
        case 11:
          this.$root.$emit("settingscontinue");
          break;
      }
      this.shown = false;
    },
  },
};
</script>

<style lang="scss">
.container {
  background-image: url(/img/grid.png);
  background-repeat: repeat;
}

.img-logo {
  margin-left: -10px;
}
</style>
