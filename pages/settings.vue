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
    <Train id="train" />
  </div>
</template>

<script>
import { createTrain } from "../helpers/layout";
export default {
  data() {
    return {
      tileSize: 100, // The size of a tile in dimension x and y.
      tileX: 50, // Position of train within the current tile.
      tileY: 200, // Position of train within the current tile.
      tileRow: 2, // Row number beginning at 0 of current tile.
      tileCol: 0, // Column number beginning at 0 of current tile.
      train: null, // HTML element (<div>) of train.
      translateX: -50, // Correction of train's position within its viewbox to tile positioning.
      translateY: -50, // Correction of train's position within its viewbox to tile positioning.
      segFrom: 2, // Current segment of current tile the train travels on.
      segTo: 0, // Current segment of current tile the train travels on.
      intervalInMs: 10, // can go down to 1, default 10, interval when train is running at full speed.
      distPerIntervalInPx: 2, // max 3!!!, default 2, distance per interval when train is running at full speed.
      // Static params (constants or calculated only once)
      radius: null, // Radius of curves/bends
      degreesPerInterval: null, // The distance in degrees a train travels on a circle
      interval: 180, // Current interval at which the training is running, varies from stopped to running.
      stopInterval: 180, // When this interval in ms is reached, the train stops.
      incInterval: 0, // The interval is incremented by this amount in ms until stopInterval is reached and the train stops. incInterval is incremented linearly.
      decInterval: 20, // The interval is decremented by this amount in ms until the train reaches full speed. decInterval is decremented linearly.
      direction: "s", // The direction in which the train is moving on a segment (s=straiht, l=left-arc, r=right-arc).
      rotationInDeg: 0, // Rotation of the train in degrees.
      alpha: 0, // The angle of the train's position if on a circle segment.
      incX: 0, // Increment in px on x-axis a train travels during an 'intervalInMs'.
      incY: 0, // Increment in px on y-axis a train travels during an 'intervalInMs'.
      mode: "stopped", // A train is in exactly one of four modes: stopped, starting, running or stopping. mode is used to simulate accelaration and slow down.
      hasBeenRun: false, // Allow continue only if train has been run before.
    };
  },

  computed: {
    layout() {
      return this.$store.state.currentLayout;
    },
  },

  mounted() {
    // console.log("settings.vue::mounted");
    this.calcStaticParams();
    // console.log(
    //   `this.radius=${this.radius}, this.degreesPerInterval=${this.degreesPerInterval}`
    // );
    // this.$store.commit("setCurrentPage", "Settings");
    this.$store.commit("enableAllMenuItems");
    this.$store.commit("disableMenuItem", 2);

    this.$store.commit("setCurrentLayout", 4);
    // console.log("this.layout=", this.layout);

    this.$root.$on("settingsstart", this.start);
    this.$root.$on("settingsstop", this.stop);
    this.$root.$on("settingscontinue", this.continue);

    // Initialize and position train...
    this.train = document.querySelector(".train");
    this.initTrain();
  },

  methods: {
    // ----------------------------------------------------

    calcStaticParams() {
      this.radius = this.tileSize / 2;
      // The distance in degrees a train travels on a circle of the
      // given radius in the given 'intervalInMs' and the 'distPerInteralInPx'.
      this.degreesPerInterval =
        (this.distPerIntervalInPx * 180) / (50 * Math.PI);
    },

    // ----------------------------------------------------

    initTrain() {
      this.mode = "stopped";
      this.tileRow = 2;
      this.tileCol = 0;
      this.tileX = 50;
      this.tileY = 100;
      this.segTo = 0; // initialize segTo according to prior tile (depending on (tileX, tileY))!!!
      this.rotationInDeg = 0;
      this.positionTrain(
        this.tileRow,
        this.tileCol,
        this.tileX,
        this.tileY,
        this.rotationInDeg
      );
      this.selectNextSegment(this.segTo);
      // console.log(`this.segFrom=${this.segFrom}, this.segTo=${this.segTo}`);
    },

    // ----------------------------------------------------

    /**
     * Select the next segment of a new tile when the end of the
     * current segment is reached. segFrom and segTo are adjusted
     * accordingly.
     */
    selectNextSegment(segTo) {
      switch (segTo) {
        case 0:
          this.segFrom = 2;
          break;
        case 1:
          this.segFrom = 3;
          break;
        case 2:
          this.segFrom = 0;
          break;
        case 3:
          this.segFrom = 1;
          break;
      }

      const switchState = this.layout[this.tileRow][this.tileCol].switchState[
        this.segFrom
      ];
      switch (switchState) {
        case "s":
          switch (this.segFrom) {
            case 0:
              this.segTo = 2;
              break;
            case 1:
              this.segTo = 3;
              break;
            case 2:
              this.segTo = 0;
              break;
            case 3:
              this.segTo = 1;
              break;
          }
          break;
        case "l":
          switch (this.segFrom) {
            case 0:
              this.segTo = 1;
              break;
            case 1:
              this.segTo = 2;
              break;
            case 2:
              this.segTo = 3;
              break;
            case 3:
              this.segTo = 0;
              break;
          }
          break;
        case "r":
          switch (this.segFrom) {
            case 0:
              this.segTo = 3;
              break;
            case 1:
              this.segTo = 0;
              break;
            case 2:
              this.segTo = 1;
              break;
            case 3:
              this.segTo = 2;
              break;
          }
          break;
        case "-":
          // no switch, find segment
          this.segTo = this.findSegmentEndOfAccessPoint(this.segFrom);
          break;
      }
    },

    // ----------------------------------------------------

    findSegmentEndOfAccessPoint(ap) {
      const segments = this.layout[this.tileRow][this.tileCol].segments;
      switch (ap) {
        case 0:
          if (segments[0] === "x") return 2;
          if (segments[3] === "x") return 1;
          if (segments[4] === "x") return 3;
          break;
        case 1:
          if (segments[1] === "x") return 3;
          if (segments[2] === "x") return 2;
          if (segments[3] === "x") return 0;
          break;
        case 2:
          if (segments[0] === "x") return 0;
          if (segments[2] === "x") return 1;
          if (segments[5] === "x") return 3;
          break;
        case 3:
          if (segments[1] === "x") return 1;
          if (segments[4] === "x") return 0;
          if (segments[5] === "x") return 2;
          break;
      }
    },

    // ----------------------------------------------------

    start() {
      // console.log("start");
      if (this.mode === "stopped") {
        this.initTrain();
        this.hasBeenRun = true;
        this.mode = "starting";
        this.interval = this.stopInterval; // Start train slowly.
        this.incInterval = 0;
        this.decInterval = 20;
        this.moveTrain();
      }
    },

    // ----------------------------------------------------

    stop() {
      // console.log("stop");
      if (!(this.mode === "stopped")) {
        this.mode = "stopping";
      }
    },

    // ----------------------------------------------------

    continue() {
      // console.log("continue");
      if (this.mode === "stopped" && this.hasBeenRun) {
        this.mode = "starting";
        this.interval = this.stopInterval; // Train starts slowly.
        this.incInterval = 0;
        this.decInterval = 20;
        this.moveSegment();
      }
    },

    // ----------------------------------------------------

    positionTrain(tileRow, tileCol, tileX, tileY, rotationAngle) {
      // console.log(
      //   `tileRow=${tileRow}, tileCol=${tileCol}, tileX=${tileX}, tileY=${tileY}`
      // );
      this.tileRow = tileRow;
      this.tileCol = tileCol;
      this.tileX = tileX;
      this.tileY = tileY;
      this.train.style.top =
        (
          this.tileRow * this.tileSize +
          this.tileY +
          this.translateY
        ).toString() + "px";
      this.train.style.left =
        (
          this.tileCol * this.tileSize +
          this.tileX +
          this.translateX
        ).toString() + "px";
      this.train.style.transform = `rotate(${rotationAngle}deg)`;
    },

    // ----------------------------------------------------

    /**
     * Calculate the point of intersection of a line at an angle
     * with a circle of a given radius and that's centered at (0,0)
     * returning an object {x, y}.
     * @param {number} alpha The angle in degrees.
     * @param {number} radius The radius in px.
     */
    calcIntersectionPoint(alpha, radius) {
      // console.log(`calcIntersectionPoint::alpha=${alpha}, radius=${radius}`);

      function getTanFromDegrees(degrees) {
        return Math.tan((degrees * Math.PI) / 180);
      }

      const tanAlpha = getTanFromDegrees(alpha);
      const tanAlphaPower2 = tanAlpha * tanAlpha;
      const radiusPower2 = radius * radius;
      // console.log(
      //   `tanAlpha=${tanAlpha}, tanAlphaPower2=${tanAlphaPower2}, radiusPower2=${radiusPower2}`
      // );

      const y = Math.sqrt(radiusPower2 / (1 / tanAlphaPower2 + 1));
      const x = y / tanAlpha;
      // console.log(`x=${x}, y=${y}`);
      return { x, y };
    },

    // ----------------------------------------------------

    /**
     * Moves the train along the current segment...
     */
    moveSegment() {
      // console.log("moveSegment::this.mode=", this.mode);
      let interval;

      this.positionTrain(
        this.tileRow,
        this.tileCol,
        this.tileX,
        this.tileY,
        this.rotationInDeg
      );

      if (this.direction === "s") {
        this.tileX += this.incX;
        this.tileY += this.incY;
      } else {
        // console.log("this.degreesPerInterval=", this.degreesPerInterval);
        this.alpha += this.degreesPerInterval;
        // console.log("this.alpha=", this.alpha);
        let { x, y } = this.calcIntersectionPoint(this.alpha, this.radius);
        // console.log(`x=${x}, y=${y}`);
        if (this.direction === "r") {
          switch (this.segFrom) {
            case 0:
              this.tileX = this.tileSize / 2 - this.radius + x;
              this.tileY = 0 + y;
              this.rotationInDeg = 180 + this.alpha;
              break;
            case 1:
              this.tileX = this.tileSize - y;
              this.tileY = this.tileSize / 2 - this.radius + x;
              this.rotationInDeg = 270 + this.alpha;
              break;
            case 2:
              this.tileX = this.tileSize / 2 + this.radius - x;
              this.tileY = this.tileSize - y;
              this.rotationInDeg = this.alpha;
              break;
            case 3:
              this.tileX = 0 + y;
              this.tileY = this.tileSize / 2 + this.radius - x;
              this.rotationInDeg = 90 + this.alpha;
              break;
          }
        } else if (this.direction === "l") {
          switch (this.segFrom) {
            case 0:
              this.tileX = this.tileSize / 2 + this.radius - x;
              this.tileY = 0 + y;
              this.rotationInDeg = 180 - this.alpha;
              break;
            case 1:
              this.tileX = this.tileSize - y;
              this.tileY = this.tileSize / 2 + this.radius - x;
              this.rotationInDeg = 270 - this.alpha;
              break;
            case 2:
              this.tileX = this.tileSize / 2 - this.radius + x;
              this.tileY = this.tileSize - y;
              this.rotationInDeg = -this.alpha;
              break;
            case 3:
              this.tileX = 0 + y;
              this.tileY = this.tileSize / 2 - this.radius + x;
              this.rotationInDeg = 90 - this.alpha;
              break;
          }
        }
      }

      // console.log(`this.tileX=${this.tileX}, this.tileY=${this.tileY}`);

      // Check if end of segment reached...
      if (
        (this.segTo === 0 && this.tileY <= 0) ||
        (this.segTo === 1 && this.tileX >= this.tileSize) ||
        (this.segTo === 2 && this.tileY >= this.tileSize) ||
        (this.segTo === 3 && this.tileX <= 0)
      ) {
        // console.log("end of segment reached");
        interval = this.interval;
        new Promise(function (resolve) {
          // console.log("inside 1. promise::interval=", interval);
          setTimeout(() => resolve(1), interval);
        }).then(this.moveTrain);
      } else {
        switch (this.mode) {
          case "running":
            this.interval = this.intervalInMs;
            break;
          case "starting":
            this.interval -= this.decInterval;
            if (this.interval < this.intervalInMs) {
              this.interval = this.intervalInMs;
            }
            this.decInterval -= 1.4;
            if (this.decInterval < 1) this.decInterval = 1;
            break;
          case "stopping":
            this.interval += this.incInterval;
            this.incInterval += 1;
            if (this.interval >= this.stopInterval) {
              this.mode = "stopped";
            }
            break;
        }
        // console.log("this.interval=", this.interval);
        interval = this.interval;
        if (!(this.mode === "stopped")) {
          new Promise(function (resolve) {
            // console.log("inside 2. promise::interval=", interval);
            setTimeout(() => resolve(1), interval);
          }).then(this.moveSegment);
        }
      }
    },

    // ----------------------------------------------------

    moveTrain() {
      // console.log("moveTrain");
      const scaleInc = 1; // Scale factor to be applied, must correspond with the scaling factor of the layouts.

      if (this.mode === "stopped") return;

      // Initialize rotation angle...
      this.alpha = 0;

      // Check if at end of tile...
      switch (this.segTo) {
        case 0:
          if (this.tileY <= 0) {
            this.tileRow -= 1;
            this.tileX = this.tileSize / 2;
            this.tileY = this.tileSize;
            this.selectNextSegment(this.segTo);
          }
          break;
        case 1:
          if (this.tileX >= this.tileSize) {
            this.tileCol += 1;
            this.tileX = 0;
            this.tileY = this.tileSize / 2;
            this.selectNextSegment(this.segTo);
          }
          break;
        case 2:
          if (this.tileY >= this.tileSize) {
            this.tileRow += 1;
            this.tileX = this.tileSize / 2;
            this.tileY = 0;
            this.selectNextSegment(this.segTo);
          }
          break;
        case 3:
          if (this.tileX <= 0) {
            this.tileCol -= 1;
            this.tileX = this.tileSize;
            this.tileY = this.tileSize / 2;
            this.selectNextSegment(this.segTo);
          }
          break;
      }

      const segment = this.segFrom.toString() + "-" + this.segTo.toString();
      // Calc new position...
      switch (segment) {
        case "0-2":
          this.direction = "s";
          this.incX = 0;
          this.incY = this.distPerIntervalInPx * scaleInc;
          this.rotationInDeg = 180;
          break;
        case "2-0":
          this.direction = "s";
          this.incX = 0;
          this.incY = -this.distPerIntervalInPx * scaleInc;
          this.rotationInDeg = 0;
          break;
        case "3-1":
          this.direction = "s";
          this.incX = this.distPerIntervalInPx * scaleInc;
          this.incY = 0;
          this.rotationInDeg = 90;
          break;
        case "1-3":
          this.direction = "s";
          this.incX = -this.distPerIntervalInPx * scaleInc;
          this.incY = 0;
          this.rotationInDeg = 270;
          break;
        case "0-3":
          this.direction = "r";
          this.incX = -this.distPerIntervalInPx * scaleInc;
          this.incY = this.distPerIntervalInPx * scaleInc;
          break;
        case "3-2":
          this.direction = "r";
          this.incX = this.distPerIntervalInPx * scaleInc;
          this.incY = this.distPerIntervalInPx * scaleInc;
          break;
        case "2-1":
          this.direction = "r";
          this.incX = this.distPerIntervalInPx * scaleInc;
          this.incY = -this.distPerIntervalInPx * scaleInc;
          break;
        case "1-0":
          this.direction = "r";
          this.incX = -this.distPerIntervalInPx * scaleInc;
          this.incY = -this.distPerIntervalInPx * scaleInc;
          break;
        case "0-1":
          this.direction = "l";
          this.incX = this.distPerIntervalInPx * scaleInc;
          this.incY = this.distPerIntervalInPx * scaleInc;
          break;
        case "1-2":
          this.direction = "l";
          this.incX = -this.distPerIntervalInPx * scaleInc;
          this.incY = this.distPerIntervalInPx * scaleInc;
          break;
        case "2-3":
          this.direction = "l";
          this.incX = -this.distPerIntervalInPx * scaleInc;
          this.incY = -this.distPerIntervalInPx * scaleInc;
          break;
        case "3-0":
          this.direction = "l";
          this.incX = this.distPerIntervalInPx * scaleInc;
          this.incY = -this.distPerIntervalInPx * scaleInc;
          break;
      }

      // console.log(`this.incX=${this.incX}, this.incY=${this.incY}`);
      // console.log("segment=", segment);
      // console.log("this.direction=", this.direction);

      if (segment === "" || this.direction === "") {
        console.error("Calculation error in moveTrain()");
        return;
      }

      this.moveSegment();
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
  /* position: relative; */
}
</style>
