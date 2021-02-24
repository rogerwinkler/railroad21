<template>
  <div :id="id" width="100" height="100" class="train" :style="cssVars">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      version="1.2"
      width="100"
      height="100"
    >
      <polygon
        points="
    42 38
    44 36
    48 34
    52 34
    56 36
    58 38
    56 38
    56 60
    58 60
    58 68
    42 68
    42 60
    44 60
    44 38
    42 38
  "
      ></polygon>
      <rect x="40" y="40" width="1" height="4"></rect>
      <rect x="40" y="48" width="1" height="4"></rect>
      <rect x="40" y="56" width="1" height="4"></rect>
      <rect x="40" y="64" width="1" height="4"></rect>
      <rect x="59" y="40" width="1" height="4"></rect>
      <rect x="59" y="48" width="1" height="4"></rect>
      <rect x="59" y="56" width="1" height="4"></rect>
      <rect x="59" y="64" width="1" height="4"></rect>
    </svg>
  </div>
</template>
<script>
  import { randomNumber } from '../helpers/randomNumber';
  export default {
    data() {
      return {
        tileSize: this.$store.state.TILE_SIZE, // The size of a tile in dimension x and y.
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
        // radius: null, // Radius of curves/bends
        // degreesPerInterval: null, // The distance in degrees a train travels on a circle
        interval: 180, // Current interval at which the training is running, varies from stopped to running.
        stopInterval: 180, // When this interval in ms is reached, the train stops.
        incInterval: 0, // The interval is incremented by this amount in ms until stopInterval is reached and the train stops. incInterval is incremented linearly.
        decInterval: 20, // The interval is decremented by this amount in ms until the train reaches full speed. decInterval is decremented linearly.
        direction: 's', // The direction in which the train is moving on a segment (s=straiht, l=left-arc, r=right-arc).
        rotationInDeg: 0, // Rotation of the train in degrees.
        alpha: 0, // The angle of the train's position if on a circle segment.
        incX: 0, // Increment in px on x-axis a train travels during an 'intervalInMs'.
        incY: 0, // Increment in px on y-axis a train travels during an 'intervalInMs'.
        mode: 'stopped', // A train is in exactly one of four modes: stopped, starting, running or stopping. mode is used to simulate accelaration and slow down.
        hasBeenRun: false, // Allow continue only if train has been run before.
        // The radius of the circle defined by the trains bounding box.
        // Collision occurs if the distance between two trains is smaller than twice the collisionRadius.
        // The bounding box of train is a rectangle of TRAIN_MAX_WIDTH x TRAIN_MAX_HEIGHT.
        // Calculate the radius of the circle centered in the center of the rectangle
        // that goes through all four corners of the rectangle (pythagoras)...
        collisionRadius: Math.sqrt(
          Math.pow(this.$store.state.TRAIN_MAX_WIDTH / 2, 2) +
            Math.pow(this.$store.state.TRAIN_MAX_HEIGHT / 2, 2)
        ),
      };
    },

    props: {
      id: {
        type: String,
        required: true,
      },
    },

    computed: {
      cssVars() {
        return {
          '--color': `rgb(
              ${randomNumber(0, 255)},
              ${randomNumber(0, 255)},
              ${randomNumber(0, 255)}
            )`,
        };
      },
      layout() {
        // console.log('this.id=', this.id);
        // console.error(
        //   'Train.vue::layout changed::layout=',
        //   this.$store.state.currentLayout
        // );
        // console.error('=============================================');
        return this.$store.state.currentLayout;
      },

      // The distance in degrees a train travels on a circle
      degreesPerInterval() {
        return (this.distPerIntervalInPx * 180) / (50 * Math.PI);
      },

      // Radius of curves / bends
      radius() {
        return this.tileSize / 2;
      },
    },

    mounted() {
      // console.log('Train.vue::mounted');
      this.train = document.getElementById(this.id);

      // Initialize layout[0] if none is set...
      if (this.$store.state.currentLayout.length === 0) {
        let layoutIdx = parseInt(localStorage.getItem('layoutIndex'));
        console.log('layoutIdx=', layoutIdx);
        if (isNaN(layoutIdx)) layoutIdx = 0;
        console.log('layoutIdx=', layoutIdx);
        this.$store.commit('setCurrentLayout', layoutIdx);
      }
      // console.log("this.layout=", this.layout);

      this.$root.$on('reset', this.reset);
      // const content = document.querySelector('.content');
      // content.addEventListener('customReset', this.handleCustomReset);
      this.$root.$on('startcontinue', this.startOrContinue);
      this.$root.$on('stoppause', this.stopOrPause);
      this.$root.$on('poweron', this.handlePowerOn);
      this.$root.$on('collision', this.handleCollision);
      // this.$root.$on('destroy', this.handleDestroy);

      // Set start position, angle and speed by random...
      const idx = randomNumber(0, this.$store.state.speeds.length - 1);
      this.$store.commit('setCurrentSpeed', this.$store.state.speeds[idx].name);
      this.intervalInMs = this.$store.state.speeds[idx].intervalInMs;
      this.distPerIntervalInPx = this.$store.state.speeds[
        idx
      ].distPerIntervalInPx;
      this.initTrain();
      // Give setup some time to finish...
      setTimeout(this.startOrContinue, 100);
    },

    // destroyed() {
    //   this.train.removeEventListener('customReset', this.handleCustomReset);
    // },

    methods: {
      // ----------------------------------------------------

      // handleDestroy() {
      //   this.$destroy();
      //   if (this.$el && this.$el.parentNode) {
      //     this.$el.parentNode.removeChild(this.$el);
      //   }
      // },

      // ----------------------------------------------------

      handleCollision(payload) {
        // console.log('handleCollision::payload=', payload);
        if (this.id === payload.trainId1 || this.id === payload.trainId2) {
          let rand = randomNumber(0, 1);
          if (rand === 0) rand = -1;
          // console.log('rand=', rand);
          this.mode = 'stopped';
          this.rotationInDeg += rand * 45;
          // console.log('this.rotationInDeg=', this.rotationInDeg);
          this.$store.commit('setGameOver', true);
        } else {
          if (this.mode !== 'stopped') {
            this.mode = 'stopping';
          }
        }
      },

      // ----------------------------------------------------

      handlePowerOn(payload) {
        // console.log('handlePowerOn::payload=', payload);
        if (
          this.tileRow === payload.row &&
          this.tileCol === payload.col &&
          (this.mode === 'stopping' || this.mode === 'stopped')
        ) {
          // Train is on tile that regained power...
          // TODO: Check that it is also on the correct segment!!!
          this.startOrContinue();
        } else {
          // In some rare cases the train rolls in an adjacent
          // tile when power is lost...
          // TODO: Calculate the exact segment the train could have rolled on!!!
          if (
            (this.tileRow === payload.row - 1 &&
              this.tileCol === payload.col &&
              this.rotationInDeg > 315 &&
              this.rotationInDeg <= 360) ||
            (this.tileRow === payload.row - 1 &&
              this.tileCol === payload.col &&
              this.rotationInDeg >= 0 &&
              this.rotationInDeg < 45) ||
            (this.tileRow === payload.row + 1 &&
              this.tileCol === payload.col &&
              this.rotationInDeg > 135 &&
              this.rotationInDeg < 225) ||
            (this.tileCol === payload.col - 1 &&
              this.tileRow === payload.row &&
              this.rotationInDeg > 225 &&
              this.rotationInDeg < 315) ||
            (this.tileCol === payload.col + 1 &&
              this.tileRow === payload.row &&
              this.rotationInDeg > 45 &&
              this.rotationInDeg < 135)
          ) {
            this.startOrContinue();
          }
        }
      },

      // ----------------------------------------------------

      setStartPosByRandom() {
        const colIdx = randomNumber(
          0,
          this.$store.state.currentLayout[0].length - 1
        );
        const rowIdx = randomNumber(
          0,
          this.$store.state.currentLayout.length - 1
        );
        // console.log(`setStartPosByRandom::rowIdx=${rowIdx}, colIdx=${colIdx}`);

        // Create an array of access points...
        let arr = [];
        for (let i = 0; i < 4; i++) {
          if (
            this.$store.state.currentLayout[rowIdx][colIdx].accessPoints[i] ===
            'x'
          ) {
            arr.push(i);
          }
        }

        // select another tile if this one has no access points...
        if (arr.length === 0) {
          this.setStartPosByRandom();
          return;
        }

        // Set tile...
        this.tileRow = rowIdx;
        this.tileCol = colIdx;

        // Select an access point by random...
        const ap = arr[randomNumber(0, arr.length - 1)];
        switch (ap) {
          case 0:
            this.rotationInDeg = 180;
            this.tileX = 50;
            this.tileY = 0;
            this.segTo = 2; // position on tile before this one
            break;
          case 1:
            this.rotationInDeg = 270;
            this.tileX = 100;
            this.tileY = 50;
            this.segTo = 3; // position on tile before this one
            break;
          case 2:
            this.rotationInDeg = 0;
            this.tileX = 50;
            this.tileY = 100;
            this.segTo = 0; // position on tile before this one
            break;
          case 3:
            this.rotationInDeg = 90;
            this.tileX = 0;
            this.tileY = 50;
            this.segTo = 1; // position on tile before this one
            break;
        }
      },

      // ----------------------------------------------------

      initTrain() {
        // console.log('initTrain::this.id=', this.id);
        // this.layout = this.$store.state.currentLayout;
        this.mode = 'stopped';
        this.hasBeenRun = false;
        this.setStartPosByRandom();
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
        // console.log('selectNextSegment::segTo=', segTo);
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
        // console.log('switchState=', switchState);
        switch (switchState) {
          case 's':
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
          case 'l':
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
          case 'r':
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
          case '-':
            // no switch, find segment
            this.segTo = this.findSegmentEndOfAccessPoint(this.segFrom);
            break;
        }
        // console.log(
        //   `selectNextSegment::this.segTo=${this.segTo}, this.segFrom=${this.segFrom}`
        // );
      },

      // ----------------------------------------------------

      findSegmentEndOfAccessPoint(ap) {
        // console.log('findSegmentEndOfAccessPoint::ap=', ap);
        // console.log('typeof(ap)=', typeof ap);
        const segments = this.layout[this.tileRow][this.tileCol].segments;
        // console.log(
        //   `this.tileRow=${this.tileRow}, this.tileCol=${this.tileCol}, segments=${segments}`
        // );
        // console.log('this.id=', this.id);
        // console.log('this.layout=', this.layout);
        switch (ap) {
          case 0:
            if (segments[0] === 'x') return 2;
            if (segments[3] === 'x') return 1;
            if (segments[4] === 'x') return 3;
            break;
          case 1:
            if (segments[1] === 'x') return 3;
            if (segments[2] === 'x') return 2;
            if (segments[3] === 'x') return 0;
            break;
          case 2:
            if (segments[0] === 'x') return 0;
            if (segments[2] === 'x') return 1;
            if (segments[5] === 'x') return 3;
            break;
          case 3:
            if (segments[1] === 'x') return 1;
            if (segments[4] === 'x') return 0;
            if (segments[5] === 'x') return 2;
            break;
        }
        // console.error('If you get here, something bad happened!!!');
      },

      // ----------------------------------------------------

      reset() {
        // console.reset('reset::this.id=', this.id);
        this.initTrain();
      },

      // handleCustomReset() {
      //   console.error('handleCustomReset::this.id=', this.id);
      //   this.initTrain();
      // },

      // ----------------------------------------------------

      startOrContinue() {
        // console.log('startOrContinue::this.mode=', this.mode);
        if (this.mode === 'stopped') {
          this.mode = 'starting';
          this.interval = this.stopInterval; // Start train slowly.
          this.incInterval = 0;
          this.decInterval = 20;
          if (this.hasBeenRun) {
            // continue
            // console.log('continue');
            this.moveSegment();
          } else {
            // start
            // console.log('start');
            this.moveTrain();
            this.hasBeenRun = true;
          }
        }
      },

      // ----------------------------------------------------

      stopOrPause() {
        // console.log('stopOrPause');
        if (!(this.mode === 'stopped')) {
          this.mode = 'stopping';
        }
      },

      // ----------------------------------------------------

      positionTrain(tileRow, tileCol, tileX, tileY, rotationAngle) {
        // console.log(
        //   `positionTrain::tileRow=${tileRow}, tileCol=${tileCol}, tileX=${tileX}, tileY=${tileY}`
        // );

        this.tileRow = tileRow;
        this.tileCol = tileCol;
        this.tileX = tileX;
        this.tileY = tileY;
        const top = this.tileRow * this.tileSize + this.tileY + this.translateY;
        const left =
          this.tileCol * this.tileSize + this.tileX + this.translateX;
        // console.log(
        //   `typeof(top)=${typeof top}, top=${top}, typeof(left)=${typeof left}, left=${left}`
        // );
        this.train.style.top = top.toString() + 'px';
        this.train.style.left = left.toString() + 'px';
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

      segIsPowered() {
        // console.log(
        //   `segIsPowered::this.segFrom=${this.segFrom}, this.segTo=${this.segTo}`
        // );
        let segment = null;
        switch (this.segFrom) {
          case 0:
            switch (this.segTo) {
              case 1:
                segment = 3;
                break;
              case 2:
                segment = 0;
                break;
              case 3:
                segment = 4;
                break;
            }
            break;
          case 1:
            switch (this.segTo) {
              case 0:
                segment = 3;
                break;
              case 2:
                segment = 2;
                break;
              case 3:
                segment = 1;
                break;
            }
            break;
          case 2:
            switch (this.segTo) {
              case 0:
                segment = 0;
                break;
              case 1:
                segment = 2;
                break;
              case 3:
                segment = 5;
                break;
            }
            break;
          case 3:
            switch (this.segTo) {
              case 0:
                segment = 4;
                break;
              case 1:
                segment = 1;
                break;
              case 2:
                segment = 5;
                break;
            }
            break;
        }
        // console.log('segment=', segment);
        if (segment === null) {
          // console.error('Segment not found for power indication!');
          return true;
        } else {
          if (
            this.$store.state.currentLayout[this.tileRow][this.tileCol]
              .poweredSegments[segment] === 'x'
          ) {
            return true;
          } else {
            return false;
          }
        }
      },

      // ----------------------------------------------------

      /**
       * A collision occurs when the distance between the centers of two
       * trains is smaller than twice the radius of the trains rectangle's
       * circumference. This radius is called the colllisionRadius...
       */
      detectCollision() {
        const trains = document.querySelectorAll('.train');
        // console.log('trains=', trains);
        let rect1, rect2;
        let x1, y1, x2, y2, dist;
        for (let j = 0; j < trains.length - 1; j++) {
          for (let i = j + 1; i < trains.length; i++) {
            rect1 = trains[j].getBoundingClientRect();
            rect2 = trains[i].getBoundingClientRect();
            // console.log('rect1=', rect1);
            // console.log('rect2=', rect2);
            x1 = rect1.left + rect1.width / 2;
            y1 = rect1.top + rect1.height / 2;
            x2 = rect2.left + rect2.width / 2;
            y2 = rect2.top + rect2.height / 2;
            dist = Math.sqrt(
              Math.pow(Math.abs(x1 - x2), 2) + Math.pow(Math.abs(y1 - y2), 2)
            );
            if (dist < this.collisionRadius) {
              // console.log('------------------COLLISION------------------');
              this.$root.$emit('collision', {
                trainId1: trains[j].id,
                trainId2: trains[i].id,
              });
            }
          }
        }
      },

      // ----------------------------------------------------

      /**
       * Moves the train along the current segment...
       */
      moveSegment() {
        // console.log("moveSegment::this.mode=", this.mode);
        let interval;

        if (!this.segIsPowered()) {
          this.mode = 'stopping';
        }

        this.positionTrain(
          this.tileRow,
          this.tileCol,
          this.tileX,
          this.tileY,
          this.rotationInDeg
        );

        this.detectCollision();

        if (this.direction === 's') {
          this.tileX += this.incX;
          this.tileY += this.incY;
        } else {
          // console.log("this.degreesPerInterval=", this.degreesPerInterval);
          this.alpha += this.degreesPerInterval;
          // console.log("this.alpha=", this.alpha);
          let { x, y } = this.calcIntersectionPoint(this.alpha, this.radius);
          // console.log(`x=${x}, y=${y}`);
          if (this.direction === 'r') {
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
          } else if (this.direction === 'l') {
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
            case 'running':
              this.interval = this.intervalInMs;
              break;
            case 'starting':
              this.interval -= this.decInterval;
              if (this.interval < this.intervalInMs) {
                this.interval = this.intervalInMs;
              }
              this.decInterval -= 1.4;
              if (this.decInterval < 1) this.decInterval = 1;
              break;
            case 'stopping':
              this.interval += this.incInterval;
              this.incInterval += 1;
              if (this.interval >= this.stopInterval) {
                this.mode = 'stopped';
              }
              break;
          }
          // console.log("this.interval=", this.interval);
          interval = this.interval;
          if (!(this.mode === 'stopped')) {
            new Promise(function (resolve) {
              // console.log("inside 2. promise::interval=", interval);
              setTimeout(() => resolve(1), interval);
            }).then(this.moveSegment);
          }
        }
      },

      // ----------------------------------------------------

      moveTrain() {
        // console.log('moveTrain');
        const scaleInc = 1; // Scale factor to be applied, must correspond with the scaling factor of the layouts.

        if (this.mode === 'stopped') return;

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

        // console.log(
        //   `before segment::this.segFrom=${this.segFrom}, this.segTo=${this.segTo}`
        // );
        // console.log('typeof(this.segFrom)=', typeof this.segFrom);
        // console.log('typeof(this.segTo)=', typeof this.segTo);
        const segment =
          parseInt(this.segFrom).toString() +
          '-' +
          parseInt(this.segTo).toString();
        // Calc new position...
        switch (segment) {
          case '0-2':
            this.direction = 's';
            this.incX = 0;
            this.incY = this.distPerIntervalInPx * scaleInc;
            this.rotationInDeg = 180;
            break;
          case '2-0':
            this.direction = 's';
            this.incX = 0;
            this.incY = -this.distPerIntervalInPx * scaleInc;
            this.rotationInDeg = 0;
            break;
          case '3-1':
            this.direction = 's';
            this.incX = this.distPerIntervalInPx * scaleInc;
            this.incY = 0;
            this.rotationInDeg = 90;
            break;
          case '1-3':
            this.direction = 's';
            this.incX = -this.distPerIntervalInPx * scaleInc;
            this.incY = 0;
            this.rotationInDeg = 270;
            break;
          case '0-3':
            this.direction = 'r';
            this.incX = -this.distPerIntervalInPx * scaleInc;
            this.incY = this.distPerIntervalInPx * scaleInc;
            break;
          case '3-2':
            this.direction = 'r';
            this.incX = this.distPerIntervalInPx * scaleInc;
            this.incY = this.distPerIntervalInPx * scaleInc;
            break;
          case '2-1':
            this.direction = 'r';
            this.incX = this.distPerIntervalInPx * scaleInc;
            this.incY = -this.distPerIntervalInPx * scaleInc;
            break;
          case '1-0':
            this.direction = 'r';
            this.incX = -this.distPerIntervalInPx * scaleInc;
            this.incY = -this.distPerIntervalInPx * scaleInc;
            break;
          case '0-1':
            this.direction = 'l';
            this.incX = this.distPerIntervalInPx * scaleInc;
            this.incY = this.distPerIntervalInPx * scaleInc;
            break;
          case '1-2':
            this.direction = 'l';
            this.incX = -this.distPerIntervalInPx * scaleInc;
            this.incY = this.distPerIntervalInPx * scaleInc;
            break;
          case '2-3':
            this.direction = 'l';
            this.incX = -this.distPerIntervalInPx * scaleInc;
            this.incY = -this.distPerIntervalInPx * scaleInc;
            break;
          case '3-0':
            this.direction = 'l';
            this.incX = this.distPerIntervalInPx * scaleInc;
            this.incY = -this.distPerIntervalInPx * scaleInc;
            break;
        }

        // console.log(`this.incX=${this.incX}, this.incY=${this.incY}`);
        // console.log("segment=", segment);
        // console.log("this.direction=", this.direction);

        if (segment === '' || this.direction === '') {
          console.error('Calculation error in moveTrain()');
          return;
        }

        this.moveSegment();
      },
    },
  };
</script>
<style scoped>
  polygon,
  rect {
    stroke: var(--color);
    stroke-width: 1px;
    /* stroke-linecap: round; */
    /* stroke-linejoin: round; */
    fill: var(--color);
  }
</style>
