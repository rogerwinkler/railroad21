<template>
  <div class="content"></div>
</template>

<script>
import {
  Tile,
  layout1,
  layout2,
  layout3,
  createLayout,
  createTrain,
  moveTrain,
  findSegmentsFromPos,
  getRandomInt,
  posOnTileToCoords,
} from "/helpers/layout";

export default {
  data() {
    return {
      layout: null,
      layoutNo: null,
      train: null,
      tileX: null, // current tile where train is at
      tileY: null, // current tile where train is at
      currentPos: 0, // current pos of train in current tile (0-3)
      stopped: false,
      intervalInMs: 10, // can go down to 1
      distPerIntervalInPx: 2, // max 3!!!
    };
  },

  //-------------------------------------------------

  computed: {},

  //-------------------------------------------------

  mounted() {
    // console.log("mounted");
    // Set page and adjust menu...
    this.$store.commit("setCurrentPage", "Railroad21");
    this.$store.commit("enableAllMenuItems");
    this.$store.commit("disableMenuItem", 0);

    // Listeneners
    this.$root.$on("restart", this.restart);
    this.$root.$on("stop", this.stop);
    this.$root.$on("layoutchanged", this.changeLayout);

    document.addEventListener("endreached", this.handleEndReached);

    // Set default layout
    createLayout(layout1, ".content");
    this.layout = layout1;
    this.train = createTrain(".content", 50, 200);
    this.tileX = 0; // Pos of first tile to be entered.
    this.tileY = 1; // Pos of first tile to be entered.
    this.currentPos = 0; // Pos before first tile!
  },

  //-------------------------------------------------

  methods: {
    stop() {
      this.stopped = true;
    },

    handleEndReached(e) {
      e.stopPropagation();
      console.log("handleEndReached::e", e);
      if (!this.stopped) {
        this.move("continue");
      } else {
        this.move("stop");
      }
    },

    // Calc pos on next tile from pos (0..3) on current tile...
    getNewPos(currentPos) {
      switch (currentPos) {
        case 0:
          return 2;
        case 1:
          return 3;
        case 2:
          return 0;
        case 3:
          return 1;
      }
    },

    //-------------------------------------------------

    calcNextTileXY() {
      switch (this.currentPos) {
        case 0:
          this.tileY -= 1;
          break;
        case 1:
          this.tileX += 1;
          break;
        case 2:
          this.tileY += 1;
          break;
        case 3:
          this.tileX -= 1;
          break;
      }
    },

    //-------------------------------------------------

    /**
     * Moves the train. Param 'mode' is used for acceleration (start),
     * slowing down (stop) and running (continue).
     * @param {String} mode Moves the train in one of three modes: 'start', 'continue' or 'stop'.
     */
    move(mode) {
      console.log("index.vue::move::mode=", mode);
      let tile;
      let segments;
      let idx;
      let coordsFrom, coordsTo;

      tile = this.layout[this.tileY][this.tileX];
      console.log("tile=", tile);
      this.currentPos = this.getNewPos(this.currentPos);
      // Find all segments leading from currentPos.
      // Segments returned by findSegmentsFromPos are
      // directed starting from currentPos...
      segments = findSegmentsFromPos(tile, this.currentPos);
      console.log("segments=", segments);
      // Randomly select a segment if multiple segments...
      idx = getRandomInt(0, segments.length - 1);
      console.log("idx=", idx);
      coordsFrom = posOnTileToCoords(this.tileX, this.tileY, this.currentPos);
      console.log("coordsFrom=", coordsFrom);
      coordsTo = posOnTileToCoords(
        this.tileX,
        this.tileY,
        parseInt(segments[idx][2])
      );
      console.log("coordsTo=", coordsTo);

      moveTrain(
        this.train,
        segments[idx], // This segment starts with currentPos!!!
        coordsFrom.x,
        coordsFrom.y,
        coordsTo.x,
        coordsTo.y,
        this.intervalInMs,
        this.distPerIntervalInPx,
        mode
      );

      this.currentPos = parseInt(segments[idx][2]);
      this.calcNextTileXY();
      console.log("this.currentPos=", this.currentPos);
      console.log(`tileX=${this.tileX}, tileY=${this.tileY}`);
    },

    //-------------------------------------------------

    restart() {
      console.log("restart");
      // Stop before restarting...
      this.stopped = true;

      // Give train some time before restarting...
      setTimeout(() => {
        this.stopped = false;

        // remove current train...
        const content = document.querySelector(".content");
        content.removeChild(this.train);

        switch (this.layout) {
          case layout1:
            this.train = createTrain(".content", 50, 200);
            this.tileX = 0; // First tile to be entered.
            this.tileY = 1; // First tile to be entered.
            this.currentPos = 0; // Pos just before first tile to be entered!
            break;
          case layout2:
            this.train = createTrain(".content", 50, 200);
            this.tileX = 0; // First tile to be entered.
            this.tileY = 1; // First tile to be entered.
            this.currentPos = 0; // Pos just before first tile to be entered!
            break;
          case layout3:
            this.train = createTrain(".content", 150, 300);
            this.tileX = 1; // First tile to be entered.
            this.tileY = 2; // First tile to be entered.
            this.currentPos = 0; // Pos just before first tile to be entered!
            break;
          default:
            break;
        }

        this.move("start");
      }, 500);
    },

    //-------------------------------------------------

    changeLayout(layoutNo) {
      console.log("changeLayout::layoutNo=", layoutNo);
      // Stop train...
      this.stopped = true;

      // remove current layout...
      const content = document.querySelector(".content");
      while (content.firstChild) {
        console.log("while remove");
        content.removeChild(content.firstChild);
      }

      switch (layoutNo) {
        case 1:
          createLayout(layout1, ".content");
          this.layout = layout1;
          this.train = createTrain(".content", 50, 200);
          this.tileX = 0; // First tile to be entered.
          this.tileY = 1; // First tile to be entered.
          this.currentPos = 0; // Pos just before first tile to be entered!
          break;
        case 2:
          createLayout(layout2, ".content");
          this.layout = layout2;
          this.train = createTrain(".content", 50, 200);
          this.tileX = 0; // First tile to be entered.
          this.tileY = 1; // First tile to be entered.
          this.currentPos = 0; // Pos just before first tile to be entered!
          break;
        case 3:
          createLayout(layout3, ".content");
          this.layout = layout3;
          this.train = createTrain(".content", 150, 300);
          this.tileX = 1; // First tile to be entered.
          this.tileY = 2; // First tile to be entered.
          this.currentPos = 0; // Pos just before first tile to be entered!
          break;
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
  height: calc(100vh - 130px);
  width: 80%;
  margin-left: 10%;
}
</style>
