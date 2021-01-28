<template>
  <div class="content"></div>
</template>

<script>
export default {
  data() {
    return {};
  },

  mounted() {
    // console.log("mounted");
    this.$store.commit("setCurrentPage", "Settings");
    this.$store.commit("enableAllMenuItems");
    this.$store.commit("disableMenuItem", 2);

    this.$root.$on("restart", this.restart);
  },

  methods: {
    restart() {
      console.log("restart");
      this.$router.push("/");
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
