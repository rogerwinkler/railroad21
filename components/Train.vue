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
  props: {
    id: {
      type: String,
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
