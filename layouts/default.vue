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
          @click.stop="handleReset"
          >mdi-skip-backward</v-icon
        >
      </div>
      <div v-if="stopped" class="play-icon nav-icon">
        <hr class="hr hidden" />
        <v-icon
          :disabled="this.page === 'Settings'"
          class="secondary--text"
          size="30px"
          @click.stop="handlePlay"
          >mdi-play</v-icon
        >
      </div>
      <div v-else class="pause-icon nav-icon">
        <hr class="hr hidden" />
        <v-icon
          :disabled="page === 'Settings'"
          class="secondary--text"
          size="30px"
          @click.stop="handleStop"
          >mdi-pause</v-icon
        >
      </div>
      <div class="nav-icon">
        <hr :class="`hr ${page === 'Settings' ? '' : 'hidden'}`" />
        <v-icon
          :disabled="page === 'Settings'"
          class="secondary--text"
          size="30px"
          @click.stop="handleSettings"
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
        stopped: true,
      };
    },

    computed: {
      items() {
        return this.$store.state.menuItems;
      },

      playDisabled() {
        return this.page === 'Settings' || !this.stopped;
      },

      page() {
        return this.$store.state.currentPage;
      },
    },

    mounted() {
      // console.log('layouts::default.vue::mounted');
      this.handleReset();
    },

    methods: {
      handleStop() {
        // console.log('handleStop');
        this.stopped = true;
        this.$store.commit('enableMenuItem', 2);
        this.$store.commit('disableMenuItem', 3);
        this.$root.$emit('stoppause');
      },

      handleReset() {
        // console.log('handleReset');
        this.stopped = true;
        this.$store.commit('enableMenuItem', 2);
        this.$store.commit('disableMenuItem', 3);
        this.$root.$emit('reset');
      },

      handlePlay() {
        // console.log('handlePlay');
        this.stopped = false;
        this.$store.commit('enableMenuItem', 3);
        this.$store.commit('disableMenuItem', 2);
        this.$root.$emit('startcontinue');
      },

      handleSettings() {
        // console.log('handleSettings');
        this.handleStop();
        this.$router.push('/settings');
      },

      menuItemClicked(itemNo) {
        // console.log("menuItemClicked::itemNo=", itemNo);
        switch (itemNo) {
          case 0:
            // home
            this.$router.push('/');
            break;
          case 1:
            this.handleReset();
            break;
          case 2:
            this.handlePlay();
            break;
          case 3:
            this.handleStop();
            break;
          case 4:
            this.handleSettings();
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
