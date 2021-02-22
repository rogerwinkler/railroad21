<template>
  <div :id="id" width="100" height="100" class="tile" :style="cssVars">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      version="1.2"
      width="100"
      height="100"
    >
      <line
        v-if="segments[0]"
        :class="`${id}-seg-0`"
        x1="50"
        y1="0"
        x2="50"
        y2="100"
      ></line>
      <line
        v-if="segments[1]"
        :class="`${id}-seg-1`"
        x1="0"
        y1="50"
        x2="100"
        y2="50"
      ></line>
      <path
        v-if="segments[2]"
        :class="`${id}-seg-2`"
        d="M 50 100 A 50 50 0 0 1 100 50"
      ></path>
      <path
        v-if="segments[3]"
        :class="`${id}-seg-3`"
        d="M 100 50 A 50 50 0 0 1 50 0"
      ></path>
      <path
        v-if="segments[4]"
        :class="`${id}-seg-4`"
        d="M 50 0 A 50 50 0 0 1 0 50"
      ></path>
      <path
        v-if="segments[5]"
        :class="`${id}-seg-5`"
        d="M 0 50 A 50 50 0 0 1 50 100"
      ></path>
    </svg>
    <v-btn v-if="switchState[0] !== '-'" class="btn-0" color="primary" fab x-small @click="toggleSwitch(0)">
      <v-icon v-if="switchState[0] === 's'" color="secondary">mdi-arrow-down</v-icon>
      <v-icon v-if="switchState[0] === 'l'" color="secondary">mdi-arrow-bottom-right</v-icon>
      <v-icon v-if="switchState[0] === 'r'" color="secondary">mdi-arrow-bottom-left</v-icon>
    </v-btn>
    <v-btn v-if="switchState[1] !== '-'" class="btn-1" color="primary" fab x-small @click="toggleSwitch(1)">
      <v-icon v-if="switchState[1] === 's'" color="secondary">mdi-arrow-left</v-icon>
      <v-icon v-if="switchState[1] === 'l'" color="secondary">mdi-arrow-bottom-left</v-icon>
      <v-icon v-if="switchState[1] === 'r'" color="secondary">mdi-arrow-top-left</v-icon>
    </v-btn>
    <v-btn v-if="switchState[2] !== '-'" class="btn-2" color="primary" fab x-small @click="toggleSwitch(2)">
      <v-icon v-if="switchState[2] === 's'" color="secondary">mdi-arrow-up</v-icon>
      <v-icon v-if="switchState[2] === 'l'" color="secondary">mdi-arrow-top-left</v-icon>
      <v-icon v-if="switchState[2] === 'r'" color="secondary">mdi-arrow-top-right</v-icon>
    </v-btn>
    <v-btn v-if="switchState[3] !== '-'" class="btn-3" color="primary" fab x-small @click="toggleSwitch(3)">
      <v-icon v-if="switchState[3] === 's'" color="secondary">mdi-arrow-right</v-icon>
      <v-icon v-if="switchState[3] === 'l'" color="secondary">mdi-arrow-top-right</v-icon>
      <v-icon v-if="switchState[3] === 'r'" color="secondary">mdi-arrow-bottom-right</v-icon>
    </v-btn>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      switchState: "----", // State of switch (s, l, r) at each of the four access points of the tile.
      segments: [], // Array of bool indicating if there's a segment of that index (true) or not (false).
      switchSegments: [], // Array indicating the switch posibilities (s, l, r) of each access point of the tile.
      segIsPowered: [], // Array indicating if segment of index has power (true) or not (false).
    }
  },

  props: {
    id: {
      type: String,
      required: true,
    },
    row: {
      type: Number,
      required: true,
    },
    col: {
      type: Number,
      required: true,
    },
    initSwitch: {
      type: String,
      default: "----",
      required: false,
    },
    left: {
      type: [Number, String],
      required: true,
    },
    top: {
      type: [Number, String],
      required: true,
    },
    segmentString: {
      type: String,
      required: true,
    },
  },

  computed: {
    cssVars() {
      return {
        "--left-pos": this.left + "px",
        "--top-pos": this.top + "px",
      };
    },
  },

  mounted() {
    // console.log("CurveStraight.vue::mounted");
    // console.log(`this.row=${this.row}, this.col=${this.col}`);
    this.segments = this.segmentStringToBoolArr(this.segmentString);
    this.segIsPowered = this.segmentStringToBoolArr(this.segmentString);
    this.calcSwitchSegments();
    this.switchState = this.initSwitch;
    // console.log("mounted::this.switchstate=", this.switchState);

    this.$root.$on('togglepower', this.handleTogglePower);
  },

  methods: {
    handleTogglePower(payload) {
      // console.log("handleTogglePower::payload=", payload);
      if (this.id === `tile-${payload.row}-${payload.col}`) {
        // This is the correct tile...
        // console.log("it's me!!!! ID=", this.id);

        // get the segment
        const seg = document.querySelector(`.tile-${payload.row}-${payload.col}-seg-${payload.segment}`);
        // console.log("seg=", seg);

        // toggle segment/power
        if (this.segIsPowered[payload.segment]) {
          this.segIsPowered[payload.segment] = false;
          seg.classList.add("power-off");
          this.$store.commit("setPoweredSegmentOff", payload);
        } else {
          this.segIsPowered[payload.segment] = true;
          seg.classList.remove("power-off");
          this.$store.commit("setPoweredSegmentOn", payload);
          this.$root.$emit("poweron", payload);
        }
        // console.log("poweredSegments=", this.$store.state.currentLayout[payload.row][payload.col].poweredSegments);
      } else {
        return;
      }
    },

    calcSwitchSegments() {
      // console.log("calcSwitchSegments");
      this.switchSegments[0] = [];
      if (this.segments[0]) this.switchSegments[0].push("s");
      if (this.segments[3]) this.switchSegments[0].push("l");
      if (this.segments[4]) this.switchSegments[0].push("r");
      this.switchSegments[1] = [];
      if (this.segments[1]) this.switchSegments[1].push("s");
      if (this.segments[2]) this.switchSegments[1].push("l");
      if (this.segments[3]) this.switchSegments[1].push("r");
      this.switchSegments[2] = [];
      if (this.segments[0]) this.switchSegments[2].push("s");
      if (this.segments[5]) this.switchSegments[2].push("l");
      if (this.segments[2]) this.switchSegments[2].push("r");
      this.switchSegments[3] = [];
      if (this.segments[1]) this.switchSegments[3].push("s");
      if (this.segments[4]) this.switchSegments[3].push("l");
      if (this.segments[5]) this.switchSegments[3].push("r");
    },

    segmentStringToBoolArr(segmentStr) {
      // console.log("segmentStringToBoolArr::segmentStr=", segmentStr);
      const arr = [];
      for (let i = 0; i < 6; i++) {
        if (segmentStr[i] === "x") {
          arr.push(true);
        } else {
          arr.push(false);
        }
      }
      // console.log("segmentStringToBoolArr::arr=", arr);
      return arr;
    },

    replaceAt(str, idx, char) {
      return str.substr(0, idx) + char + str.substr(idx + 1);
    },

    toggleSwitch(n) {
      // NOTE: We take advantage of the fact that switches are
      // round robined l->s->r->l... If a possibility is missing
      // we just jump to the next!

      // console.log("toggleSwitch::n=", n);
      // console.log("this.switchState (before)=", this.switchState);

      switch (this.switchState[n]) {
        case "l":
          if (this.switchSegments[n].indexOf("s") > -1) {
            this.switchState = this.replaceAt(this.switchState, n, "s");
          } else {
            this.switchState = this.replaceAt(this.switchState, n, "r");
          }
          break;
        case "s":
          if (this.switchSegments[n].indexOf("r") > -1) {
            this.switchState = this.replaceAt(this.switchState, n, "r");
          } else {
            this.switchState = this.replaceAt(this.switchState, n, "l");
          }
          break;
        case "r":
          if (this.switchSegments[n].indexOf("l") > -1) {
            this.switchState = this.replaceAt(this.switchState, n, "l");
          } else {
            this.switchState = this.replaceAt(this.switchState, n, "s");
          }
          break;
      }
      // console.log("this.switchState (after)=", this.switchState);
      // Update switchState in Store...
      this.$store.commit("updateSwitchState", {row: this.row, col: this.col, switchState: this.switchState});
    },
  },
};
</script>

<style scoped>
.btn-0,
.btn-1,
.btn-2,
.btn-3 {
  position: absolute;
  width: 24px;
  height: 24px;
  z-index: +10;
}
.btn-0 {
  left: 62px;
  top: 2px;
}
.btn-1 {
  left: 74px;
  top: 62px;
}
.btn-2 {
  left: 14px;
  top: 75px;
}
.btn-3 {
  left: 2px;
  top: 14px;
}
path,
line {
  stroke: black;
  stroke-width: 5px;
  fill: none;
}
.power-off {
  stroke: #aaa;
}
div {
  left: var(--left-pos);
  top: var(--top-pos);
}
</style>
