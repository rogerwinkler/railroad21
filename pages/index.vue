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
    <Train v-if="noOfTrains > 0" id="train-1" />
    <Train v-if="noOfTrains > 1" id="train-2" />
    <Train v-if="noOfTrains > 2" id="train-3" />
    <Train v-if="noOfTrains > 3" id="train-4" />
    <Train v-if="noOfTrains > 4" id="train-5" />
    <Train v-if="noOfTrains > 5" id="train-6" />
    <Train v-if="noOfTrains > 6" id="train-7" />
    <Train v-if="noOfTrains > 7" id="train-8" />

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
        // The radius of the circle defined by the trains bounding box.
        // Collision occurs if the distance between two trains is smaller than twice the collisionRadius.
        // The bounding box of train is a rectangle of TRAIN_MAX_WIDTH x TRAIN_MAX_HEIGHT.
        // Calculate the radius of the circle centered in the center of the rectangle
        // that goes through all four corners of the rectangle (pythagoras)...
        // collisionRadius: Math.sqrt(
        //   Math.pow(this.$store.state.TRAIN_MAX_WIDTH / 2, 2) +
        //     Math.pow(this.$store.state.TRAIN_MAX_HEIGHT / 2, 2)
        // ),
        // collisionDetectionIntervalId: null,
        // collisionDetectionInterval: 10,
        // isCollisionDetectionOn: false,
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
      console.error('index.vue::mounted');

      // Mark available trains as active...
      // let train;
      // train = document.getElementById('train-1');
      // console.log('train1=', train);
      // for (let i = 0; i < this.noOfTrains; i++) {
      //   train = document.getElementById(`train-${i + 1}`);
      //   if (!!train) {
      //     console.log('train=', train);
      //     train.classList.add('active-train');
      //     console.log('train.classList=', train.classList);
      //   }
      // }

      this.$store.commit('setCurrentPage', 'Home');
      this.$store.commit('enableAllMenuItems');
      this.$store.commit('disableMenuItem', 0);
      this.$store.commit('disableMenuItem', 3);
      this.$store.commit('setGameOver', false);

      const cont = document.querySelector('.container');
      // console.log('cont=', cont);
      cont.addEventListener('click', this.handleClick);

      // detect collisions...
      // this.startCollisionDetection();
    },

    destroyed() {
      // console.log('index.vue::destroyed');

      // clear clear detection interval...
      // this.stopCollisionDetection();

      // Send instruction to trains to destroy themselves...
      // this.$root.$emit('destroy');

      // Remove trains
      // const content = document.querySelector('.content');
      // const trains = document.querySelectorAll('.train');
      // console.log('trains=', trains);
      // for (let i = 0; i < trains.length; i++) {
      //   content.removeChild(trains[i]);
      // }

      // Mark available trains as inactive
      // let train;
      // for (let i = 0; i < this.noOfTrains; i++) {
      //   train = document.getElementById(`train-${i + 1}`);
      //   if (!!train) {
      //     console.log('train=', train);
      //     train.classList.remove('active-train');
      //     console.log('train.classList=', train.classList);
      //   }
      // }

      const cont = document.querySelector('.container');
      cont.removeEventListener('click', this.handleClick);
    },

    methods: {
      // startCollisionDetection() {
      //   console.log(
      //     'startCollisionDetection::this.isCollisionDetectionOn=',
      //     this.isCollisionDetectionOn
      //   );
      //   if (!this.isCollisionDetectionOn) {
      //     this.collisionDetectionIntervalId = setInterval(
      //       this.detectCollision,
      //       this.collisionDetectionInterval
      //     );
      //   }
      // },

      // stopCollisionDetection() {
      //   console.log(
      //     'stopCollisionDetection::this.isCollisionDetectionOn=',
      //     this.isCollisionDetectionOn
      //   );
      //   if (this.isCollisionDetectionOn) {
      //     clearInterval(this.collisionDetectionIntervalId);
      //   }
      // },

      // detectCollision() {
      //   console.log('index.vue::detectCollision');
      //   // Compare each train's position with each other train's position...
      //   let x1, y1, x2, y2;
      //   for (let j = 0; j < this.$store.state.trainPositions.length - 1; j++) {
      //     for (
      //       let i = j + 1;
      //       i < this.$store.state.trainPositions.length;
      //       i++
      //     ) {
      //       x1 = this.$store.state.trainPositions[j].x;
      //       y1 = this.$store.state.trainPositions[j].y;
      //       x2 = this.$store.state.trainPositions[i].x;
      //       y2 = this.$store.state.trainPositions[i].y;

      //       // Calculate distance between this train and other train...
      //       const dist = Math.sqrt(
      //         Math.pow(Math.abs(x1 - x2), 2) + Math.pow(Math.abs(y1 - y2), 2)
      //       );
      //       if (dist < this.collisionRadius) {
      //         // we have a collision...
      //         console.log('------------------COLLISION------------------');
      //         this.$root.$emit('collision', {
      //           trainId1: this.$store.state.trainPositions[j].id,
      //           trainId2: this.$store.state.trainPositions[i].id,
      //         });
      //         this.stopCollisionDetection();
      //         return;
      //       }
      //     }
      //   }
      // },

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
</style>
