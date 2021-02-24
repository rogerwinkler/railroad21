<template>
  <div class="content">
    <r-overline>About</r-overline>
    <div class="logo">
      <!-- <Logo /> -->
      <img src="img/r21-logo-big-frame.svg" alt="Logo Railroad21" width="80%" />
    </div>
    <!-- <hr class="hr" /> -->
    <div class="version-date-copyright">
      <span><strong>Version:</strong> 1.0.7</span>
      <br />
      <span><strong>Date:</strong> February 24, 2021</span>
      <br />
      <span>&copy;2021 Roger Winkler</span>
    </div>
    <!-- <hr class="hr" /> -->
    <div class="data-protection-header">Data Protection and Privacy</div>
    <div class="data-protection-text">
      We take your privacy seriously. We do not collect any data at all.
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {};
    },

    mounted() {
      // console.log("mounted");
      this.$store.commit('setCurrentPage', 'about');
      this.$store.commit('enableAllMenuItems');
      this.$store.commit('disableMenuItem', 1);
      this.$store.commit('disableMenuItem', 2);
      this.$store.commit('disableMenuItem', 3);
    },

    // destroyed() {
    //   // console.log("destroyed");
    //   this.$store.commit('enableMenuItem', 6);
    // },
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
  .logo {
    margin-top: 10px;
    margin-bottom: 20px;
    text-align: center;
  }
  .title {
    font-family: 'Quicksand', 'Source Sans Pro', -apple-system,
      BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial,
      sans-serif;
    display: block;
    font-weight: 400;
    font-size: 68px !important;
    /* color: #35495e; */
    /* color: var(--bg-color-tertiary); */
    color: #aaa;
    letter-spacing: 1px;
    margin-left: -4px;
    margin-top: 16px;
  }
  .version-date-copyright {
    display: flex;
    flex-direction: column;
    text-align: center;
    line-height: 0.8rem;
  }
  /* .hr {
    width: 90%;
    margin: 20px 0 16px 0;
  } */
  .data-protection-header {
    text-align: left;
    font-weight: 800;
    width: 80%;
    line-height: 1rem;
    margin-top: 50px;
  }
  .data-protection-text {
    text-align: left;
    width: 80%;
    line-height: 1.2rem;
    margin-top: 10px;
  }
</style>
