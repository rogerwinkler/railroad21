<template>
  <div class="content">
    <div class="scoring">
      <div class="level">Level: {{ gameLevel }}</div>
      <div class="high-score">High Score: {{ highScore }}</div>
      <div class="points">Points: {{ points }}</div>
    </div>
    <span v-for="n in layout.length" :key="n">
      <span v-for="m in layout[n - 1].length" :key="m">
        <Tile
          :id="`tile-${n - 1}-${m - 1}`"
          :row="n - 1"
          :col="m - 1"
          :init-switch="layout[n - 1][m - 1].switchState"
          :top="(n - 1) * 100"
          :left="(m - 1) * 100"
          :segmentString="layout[n - 1][m - 1].segments"
        />
      </span>
    </span>

    <span v-for="n in noOfTrains" :key="`train-${n}`">
      <Train :id="`train-${n}`" />
    </span>

    <!-- alert dialog -->
    <v-alert
      :value="gameOver"
      class="alert primary--text"
      elevation="10"
      color="secondary"
      transition="scale-transition"
    >
      {{ textRow1 }}
      <br />
      {{ textRow2 }}
      <br />
      {{ textRow3 }}
      <br />
      {{ textRow4 }}
    </v-alert>
    <!-- end alert dialog -->
  </div>
</template>

<script>
  export default {
    data() {
      return {
        tileSize: this.$store.state.TILE_SIZE, // The size of a tile in dimension x and y.
        offsetX: this.$store.state.VIEWPORT_OFFSET_X,
        offsetY: this.$store.state.VIEWPORT_OFFSET_Y,
        tolerance: this.$store.state.TOLERANCE_DIST,
        highScore: localStorage.getItem('highScore'),
        textRow1: '',
        textRow2: '',
        textRow3: '',
        textRow4: '',
      };
    },

    computed: {
      layout() {
        return this.$store.state.currentLayout;
      },

      gameOver() {
        if (this.gameMode === 'play') {
          if (
            this.$store.state.points >=
            this.$store.state.gameLevels[this.gameLevel - 1].pointsNeeded
          ) {
            if (this.points > this.highScore) {
              this.textRow1 = `!!!!!!! LEVEL ${this.gameLevel} resolved !!!!!!!`;
              this.textRow2 = `Proceeding to level ${this.gameLevel + 1}!`;
              this.textRow3 = '!!!!!!! NEW --- HIGH SCORE !!!!!!!';
              this.textRow4 = `${this.points} points`;
              localStorage.setItem('highScore', this.points);
            } else {
              this.textRow1 = `!!!!!!! LEVEL ${this.gameLevel} resolved !!!!!!!`;
              this.textRow2 = `Proceeding to level ${this.gameLevel + 1}.`;
              this.textRow3 = '';
              this.textRow4 = '';
            }
            // Emit collision to force trains to stop...
            this.$root.$emit('collision', { trainId1: '', trainId2: '' });
            setTimeout(this.incGameLevel, 5000);
          } else {
            if (this.points > this.highScore) {
              this.textRow1 = '!!!!!!! G A M E --- O V E R !!!!!!!';
              this.textRow2 = '';
              this.textRow3 = '!!!!!!! NEW --- HIGH SCORE !!!!!!!';
              this.textRow4 = `${this.points} points`;
              localStorage.setItem('highScore', this.points);
            } else {
              this.textRow1 = '';
              this.textRow2 = '!!!!!!! G A M E --- O V E R !!!!!!!';
              this.textRow3 = '';
              this.textRow4 = '';
            }
          }
        } else {
          // gameMode === 'trial'
          if (this.points > this.highScore) {
            this.textRow1 = '!!!!!!! G A M E --- O V E R !!!!!!!';
            this.textRow2 = '';
            this.textRow3 = '!!!!!!! NEW --- HIGH SCORE !!!!!!!';
            this.textRow4 = `${this.points} points`;
            localStorage.setItem('highScore', this.points);
          } else {
            this.textRow1 = '';
            this.textRow2 = '!!!!!!! G A M E --- O V E R !!!!!!!';
            this.textRow3 = '';
            this.textRow4 = '';
          }
        }
        return this.$store.state.gameOver;
      },

      // highScore() {
      //   let highScore = parseInt(localStorage.getItem('highScore'));
      //   if (isNaN(highScore)) highScore = 0;
      //   return highScore;
      // },

      noOfTrains() {
        return this.$store.state.currentNoOfTrains;
      },

      gameMode() {
        let gm = localStorage.getItem('gameMode');
        if (!gm) gm = 'play';
        return gm;
      },

      gameLevel() {
        let gl = parseInt(localStorage.getItem('gameLevel'));
        if (isNaN(gl)) gl = 1;
        return gl;
      },

      points() {
        if (
          this.$store.state.points >=
          this.$store.state.gameLevels[this.gameLevel - 1].pointsNeeded
        ) {
          this.$store.commit('setGameOver', true);
        }
        return this.$store.state.points;
      },
    },

    mounted() {
      // console.log('index.vue::mounted');

      // Set high score...
      let highScore = parseInt(localStorage.getItem('highScore'));
      if (isNaN(highScore)) highScore = 0;
      this.highScore = highScore;

      this.$root.$on('reset', this.handleReset);
      this.$store.commit('setCurrentPage', 'Home');
      this.$store.commit('enableAllMenuItems');
      this.$store.commit('disableMenuItem', 0);
      this.$store.commit('disableMenuItem', 3);
      this.$store.commit('setGameOver', false);
      this.$store.commit('setGameStopped', true);

      let noOfTrains = parseInt(localStorage.getItem('noOfTrains'));
      // console.log('noOfTrains=', noOfTrains);
      if (isNaN(noOfTrains)) noOfTrains = 2;
      this.$store.commit('setCurrentNoOfTrains', noOfTrains);

      const cont = document.querySelector('.container');
      // console.log('cont=', cont);
      cont.addEventListener('click', this.handleClick);
      this.handleReset();
    },

    destroyed() {
      // console.log('index.vue::destroyed');
      const cont = document.querySelector('.container');
      cont.removeEventListener('click', this.handleClick);
    },

    methods: {
      incGameLevel() {
        // console.log('incGameLevel::this.gameLevel=', this.gameLevel);
        localStorage.setItem('gameLevel', this.gameLevel + 1);
        this.handleReset();
        location.href = '/';
      },

      handleReset() {
        let highScore = parseInt(localStorage.getItem('highScore'));
        if (isNaN(highScore)) highScore = 0;
        this.highScore = highScore;
        let layoutIdx, noOfTrains;

        if (this.gameMode === 'play') {
          // Set gameLevel...
          this.$store.commit('setGameLevel', this.gameLevel);
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
          // gameMode === 'trial'
          // TO DO: Set speed range...
        }
      },

      handleClick(e) {
        // console.log('handleClick::e=', e);
        e.stopPropagation();

        // Find position of tile that contains (x,y)...
        const tileCol = Math.floor((e.clientX - this.offsetX) / this.tileSize);
        const tileRow = Math.floor((e.clientY - this.offsetY) / this.tileSize);
        // console.log(`tileCol=${tileCol}, tileRow=${tileRow}`);
        if (
          tileCol > this.layout[0].length - 1 ||
          tileRow > this.layout.length - 1
        ) {
          // click was outside of layout, do nothing...
          return;
        }

        // Find position within tile (tileX,tileY) of (x,y)...
        const tileX = e.clientX - tileCol * this.tileSize - this.offsetX;
        const tileY = e.clientY - tileRow * this.tileSize - this.offsetY;
        // console.log(`tileX=${tileX}, tileY=${tileY}`);

        // Calc distances of (x,y) to available segments and store
        // them in the array distToSegsArr...
        let distToSegsArr = [];
        const segments = this.layout[tileRow][tileCol].segments;
        // console.log('segments=', segments);
        if (segments[0] === 'x') {
          distToSegsArr[0] = Math.abs(this.tileSize / 2 - tileX);
        } else {
          distToSegsArr[0] = null;
        }
        if (segments[1] === 'x') {
          distToSegsArr[1] = Math.abs(this.tileSize / 2 - tileY);
        } else {
          distToSegsArr[1] = null;
        }
        if (segments[2] === 'x') {
          distToSegsArr[2] = Math.round(
            Math.abs(
              this.tileSize / 2 -
                Math.sqrt(
                  Math.pow(this.tileSize - tileX, 2) +
                    Math.pow(this.tileSize - tileY, 2)
                )
            )
          );
        } else {
          distToSegsArr[2] = null;
        }
        if (segments[3] === 'x') {
          distToSegsArr[3] = Math.round(
            Math.abs(
              this.tileSize / 2 -
                Math.sqrt(
                  Math.pow(this.tileSize - tileX, 2) + Math.pow(tileY, 2)
                )
            )
          );
        } else {
          distToSegsArr[3] = null;
        }
        if (segments[4] === 'x') {
          distToSegsArr[4] = Math.round(
            Math.abs(
              this.tileSize / 2 -
                Math.sqrt(Math.pow(tileX, 2) + Math.pow(tileY, 2))
            )
          );
        } else {
          distToSegsArr[4] = null;
        }
        if (segments[5] === 'x') {
          distToSegsArr[5] = Math.round(
            Math.abs(
              this.tileSize / 2 -
                Math.sqrt(
                  Math.pow(tileX, 2) + Math.pow(this.tileSize - tileY, 2)
                )
            )
          );
        } else {
          distToSegsArr[5] = null;
        }
        // console.log('distToSegsArr=', distToSegsArr);

        // Find closest segment. If more than one are found,
        // pick the first...
        let segment = null;
        let min = this.tileSize;
        let minIdx = null;
        for (let i = 0; i < distToSegsArr.length; i++) {
          if (distToSegsArr[i] !== null && distToSegsArr[i] < min) {
            min = distToSegsArr[i];
            minIdx = i;
          }
        }
        if (minIdx !== null) {
          // segment found
          if (min <= this.tolerance) {
            // click was within tolerance distance to segment
            segment = minIdx;
          }
        }
        if (segment !== null) {
          // console.log('segment=', segment);
          this.$root.$emit('togglepower', {
            col: tileCol,
            row: tileRow,
            segment: segment,
          });
        } else {
          // console.log('no segment within tolerance distance found');
        }
      },
    },
  };
</script>

<style scoped>
  .content {
    /* display: flex; */
    /* flex-direction: column; */
    /* align-items: center; */
    /* justify-content: center; */
    height: calc(100vh - 140px);
    width: 90%;
    margin-left: 5%;
  }
  .scoring {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
  }
  .alert {
    z-index: +2;
  }
</style>
