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
      <img
        class="img-logo-text-trans"
        src="img/r21-logo-text-trans.svg"
        alt="Railroad21 logo as text"
      />
      <!-- <v-toolbar-title v-else class="secondary--text">{{
        title
      }}</v-toolbar-title> -->
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
    <!-- <v-footer
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
    </v-footer> -->
    <v-footer
      class="vfooter"
      style="justify-content: space-around"
      absolute
      app
      color="primary"
      dark
      height="80px"
    >
      <div class="nav-icon">
        <hr :class="`hr ${page === 'Home' ? '' : 'hidden'}`" />
        <v-icon
          :disabled="page === 'Home'"
          class="secondary--text"
          size="30px"
          @click.stop="$router.push('/')"
          >mdi-home-outline</v-icon
        >
      </div>
      <div class="nav-icon">
        <hr class="hr hidden" />
        <v-icon
          :disabled="page === 'Settings'"
          class="secondary--text"
          size="30px"
          @click.stop="$root.$emit('reset')"
          >mdi-skip-backward</v-icon
        >
      </div>
      <div class="nav-icon">
        <hr class="hr hidden" />
        <v-icon
          :disabled="page === 'Settings'"
          class="secondary--text"
          size="30px"
          @click.stop="$root.$emit('startcontinue')"
          >mdi-play</v-icon
        >
      </div>
      <div class="nav-icon">
        <hr class="hr hidden" />
        <v-icon
          :disabled="page === 'Settings'"
          class="secondary--text"
          size="30px"
          @click.stop="$root.$emit('stoppause')"
          >mdi-pause</v-icon
        >
      </div>
      <div class="nav-icon">
        <hr :class="`hr ${page === 'Settings' ? '' : 'hidden'}`" />
        <v-icon
          :disabled="page === 'Settings'"
          class="secondary--text"
          size="30px"
          @click.stop="$router.push('/settings')"
          >mdi-ballot-outline</v-icon
        >
      </div>
    </v-footer>
  </v-app>
</template>

<script>
  export default {
    data() {
      return {
        shown: false,
      };
    },

    computed: {
      items() {
        return this.$store.state.menuItems;
      },

      page() {
        return this.$store.state.currentPage;
      },
    },

    methods: {
      menuItemClicked(itemNo) {
        // console.log("menuItemClicked::itemNo=", itemNo);
        switch (itemNo) {
          case 0:
            // home
            this.$router.push('/');
            break;
          case 1:
            this.$root.$emit('reset');
            break;
          case 2:
            this.$root.$emit('startcontinue');
            break;
          case 3:
            this.$root.$emit('stoppause');
            break;
          case 4:
            this.$router.push('/settings');
            break;
        }
        this.shown = false;
      },
    },
  };
</script>

<style scoped>
  .container {
    background-image: url(/img/grid.png);
    background-repeat: repeat;
  }
  .img-logo {
    margin-left: -10px;
  }
  .img-logo-text-trans {
    height: 40px;
  }
  @media (max-width: 700px) {
    .img-logo-text-trans {
      height: 30px;
    }
  }
  @media (max-width: 540px) {
    .img-logo-text-trans {
      height: 20px;
    }
  }
  .vfooter {
    /* position: absolute; */
    /* 676 - 80 = 550 */
    /* top: 596px;  */
    /* left: 0; */
  }
  .nav-icon {
    display: flex;
    flex-direction: column;
  }
  .hidden {
    visibility: hidden;
  }
  .hr {
    border-color: $mx-success;
    margin-bottom: 4px;
  }
</style>
