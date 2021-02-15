<template>
  <div :id="id" width="100" height="100" class="train">
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
  export default {
    data() {
      return {
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
      };
    },

    props: {
      id: {
        type: String,
        required: true,
      },

      startRow: {
        type: [Number, String],
        required: true,
      },

      startCol: {
        type: [Number, String],
        required: true,
      },
    },
  };
</script>
<style scoped>
  polygon,
  rect {
    stroke: red;
    stroke-width: 1px;
    /* stroke-linecap: round; */
    /* stroke-linejoin: round; */
    fill: red;
  }
</style>
