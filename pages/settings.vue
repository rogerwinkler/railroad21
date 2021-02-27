<template>
  <div class="content">
    <v-card class="mt-n1" elevation="2">
      <r-overline>Settings</r-overline>
      <r-caption> Select your preferences.</r-caption>
      <v-card-text>
        Game Mode
        <v-radio-group v-model="gameMode" row @change="gameModeChanged">
          <v-radio label="play" value="play"></v-radio>
          <v-radio label="trial" value="trial"></v-radio>
        </v-radio-group>

        Game Level
        <v-select
          v-model="gameLevel"
          class="inp"
          :items="gameLevels"
          single-line
          @change="gameLevelChanged(gameLevel)"
          :disabled="gameMode === 'play' ? false : true"
        ></v-select>

        Layout
        <v-select
          v-model="layout"
          class="inp"
          :items="layouts"
          single-line
          @change="layoutChanged(layout)"
          :disabled="gameMode === 'play' ? true : false"
        ></v-select>

        Number of Trains
        <v-select
          v-model="noOfTrains"
          class="inp"
          :items="noOfTrainsArr"
          single-line
          @change="noOfTrainsChanged(noOfTrains)"
          :disabled="gameMode === 'play' ? true : false"
        ></v-select>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        layout: '',
        noOfTrains: this.$store.state.currentNoOfTrains,
        noOfTrainsArr: this.$store.state.noOfTrains,
        gameMode: 'play',
        gameLevel: null,
        gameLevels: [],
      };
    },

    computed: {
      layouts() {
        let arr = [];
        for (let i = 0; i < this.$store.state.layouts.length; i++) {
          const dimY = this.$store.state.layouts[i].length;
          const dimX = this.$store.state.layouts[i][0].length;
          arr.push(`Layout ${i + 1} (Size: ${dimX} x ${dimY})`);
        }
        // console.log('arr=', arr);
        return arr;
      },
    },

    mounted() {
      // console.log("settings.vue::mounted");
      this.$store.commit('setCurrentPage', 'Settings');
      this.$store.commit('disableAllMenuItems');
      this.$store.commit('enableMenuItem', 0);
      this.$store.commit('enableMenuItem', 6);

      // Initialize layout
      let idx = this.$store.state.layouts.indexOf(
        this.$store.state.currentLayout
      );
      // console.log('currentLayout=', this.$store.state.currentLayout);
      // console.log('idx=', idx);
      // If layout is not yet defined then select first layout...
      if (idx === -1) idx = 0;
      const dimY = this.$store.state.layouts[idx].length;
      const dimX = this.$store.state.layouts[idx][0].length;
      this.layout = `Layout ${idx + 1} (Size: ${dimX} x ${dimY})`;

      // Initialize gameMOde, gameLevel and gameLevels
      let gm = localStorage.getItem('gameMode');
      // console.log('gm=', gm);
      if (!gm) gm = 'play';
      this.gameMode = gm;
      localStorage.setItem('gameMode', this.gameMode);
      this.gameModeChanged(this.gameMode);

      // Initialize speed
      // If speed is not yet defined select "normal" speed...
      if (this.speed === null) this.speed = 'normal';
    },

    methods: {
      gameModeChanged(gameMode) {
        // console.log('gameModeChanged::this.gameMode=', this.gameMode);
        localStorage.setItem('gameMode', gameMode);

        let layoutIdx, noOfTrains;
        if (gameMode === 'play') {
          // Set gameLevel...
          let gl = parseInt(localStorage.getItem('gameLevel'));
          if (isNaN(gl)) gl = 1;
          this.gameLevel = gl;
          this.$store.commit('setGameLevel', gl);
          this.gameLevels = [];
          for (let i = 0; i < this.gameLevel; i++) {
            this.gameLevels.push(this.$store.state.gameLevels[i].level);
          }
          // Set layout...
          layoutIdx = this.$store.state.gameLevels[this.gameLevel - 1]
            .layoutIdx;
          this.$store.commit('setCurrentLayout', layoutIdx);
          localStorage.setItem('layoutIndex', layoutIdx.toString());
          // Set noOfTrains...
          noOfTrains = this.$store.state.gameLevels[this.gameLevel - 1]
            .noOfTrains;
          this.$store.commit('setCurrentNoOfTrains', noOfTrains);
          localStorage.setItem('noOfTrains', noOfTrains);
          // TO DO: Set speed range...
        } else {
          // Set layout...
          // console.log('this.layout=', this.layout);
          layoutIdx = parseInt(this.layout.substr(7)) - 1;
          // console.log('layoutIdx=', layoutIdx);
          this.$store.commit('setCurrentLayout', layoutIdx);
          localStorage.setItem('layoutIndex', layoutIdx.toString());
          // Set noOfTrains
          noOfTrains = this.noOfTrains;
          this.$store.commit('setCurrentNoOfTrains', noOfTrains);
          localStorage.setItem('noOfTrains', noOfTrains);
          // TO DO: Set speed range...
        }
      },

      gameLevelChanged(gameLevel) {
        console.log('gameLevelChanged::gameLevel=', gameLevel);
        this.$store.commit('setGameLevel', gameLevel);
      },

      layoutChanged(layout) {
        console.log('layoutChanged::layout=', layout);
        // Get layout index out of text...
        const idx = parseInt(layout.substr(7)) - 1;
        // console.log('layout index=', idx);
        this.$store.commit('setCurrentLayout', idx);
        localStorage.setItem('layoutIndex', idx.toString());
      },

      noOfTrainsChanged(noOfTrains) {
        // console.log('noOfTrainsChanged::noOfTrains=', noOfTrains);
        this.$store.commit('setCurrentNoOfTrains', noOfTrains);
        localStorage.setItem('noOfTrains', noOfTrains);
      },
    },
  };
</script>

<style scoped>
  .content {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: calc(100vh - 140px);
    width: 80%;
    margin-left: 10%;
  }
  .inp {
    width: 100%;
  }
</style>
