<template>
  <div class="content">
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
      !!!!!!! G A M E --- O V E R !!!!!!!
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
      };
    },

    computed: {
      layout() {
        return this.$store.state.currentLayout;
      },

      gameOver() {
        return this.$store.state.gameOver;
      },

      noOfTrains() {
        return this.$store.state.currentNoOfTrains;
      },
    },

    mounted() {
      // console.log('index.vue::mounted');

      this.$store.commit('setCurrentPage', 'Home');
      this.$store.commit('enableAllMenuItems');
      this.$store.commit('disableMenuItem', 0);
      this.$store.commit('disableMenuItem', 3);
      this.$store.commit('setGameOver', false);
      this.$store.commit('setGameStopped', false);

      const cont = document.querySelector('.container');
      // console.log('cont=', cont);
      cont.addEventListener('click', this.handleClick);
    },

    destroyed() {
      // console.log('index.vue::destroyed');
      const cont = document.querySelector('.container');
      cont.removeEventListener('click', this.handleClick);
    },

    methods: {
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
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: calc(100vh - 140px);
    width: 80%;
    margin-left: 10%;
  }
  .alert {
    z-index: +2;
  }
</style>
