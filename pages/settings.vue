<template>
  <div class="content">
    <v-card class="mt-n1" elevation="2">
      <r-overline>Settings</r-overline>
      <r-caption> Select your preferences.</r-caption>
      <v-card-text>
        Select Layout
        <v-select
          v-model="layout"
          class="inp"
          :items="layouts"
          single-line
          @change="layoutChanged(layout)"
        ></v-select>
        Select Speed
        <v-select
          v-model="speed"
          class="inp"
          :items="speeds"
          item-text="name"
          item-value="name"
          return-object
          single-line
          @change="speedChanged(speed.name)"
        ></v-select>
        Select Number of Trains
        <v-select
          v-model="noOfTrains"
          class="inp"
          :items="noOfTrainsArr"
          single-line
          @change="noOfTrainsChanged(noOfTrains)"
        ></v-select>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        layout: '',
        speed: this.$store.state.currentSpeed,
        speeds: this.$store.state.speeds,
        noOfTrains: this.$store.state.currentNoOfTrains,
        noOfTrainsArr: this.$store.state.noOfTrains,
      };
    },

    computed: {
      layouts() {
        let arr = [];
        for (let i = 0; i < this.$store.state.layouts.length; i++) {
          const dimY = this.$store.state.layouts[i].length;
          const dimX = this.$store.state.layouts[i][0].length;
          arr.push(`Layout ${i + 1} (Size: ${dimX} x ${dimY})`);
        }
        // console.log('arr=', arr);
        return arr;
      },
    },

    mounted() {
      // console.log("settings.vue::mounted");
      this.$store.commit('setCurrentPage', 'Settings');
      this.$store.commit('disableAllMenuItems');
      this.$store.commit('enableMenuItem', 0);

      // Initialize layout
      let idx = this.$store.state.layouts.indexOf(
        this.$store.state.currentLayout
      );
      // console.log('currentLayout=', this.$store.state.currentLayout);
      // console.log('idx=', idx);
      // If layout is not yet defined then select first layout...
      if (idx === -1) idx = 0;
      const dimY = this.$store.state.layouts[idx].length;
      const dimX = this.$store.state.layouts[idx][0].length;
      this.layout = `Layout ${idx + 1} (Size: ${dimX} x ${dimY})`;

      // Initialize speed
      // If speed is not yet defined select "normal" speed...
      if (this.speed === null) this.speed = 'normal';
    },

    methods: {
      layoutChanged(layout) {
        // console.log('layoutChanged::layout=', layout);
        // Get layout index out of text...
        const idx = parseInt(layout.substr(7)) - 1;
        // console.log('layout index=', idx);
        this.$store.commit('setCurrentLayout', idx);
      },

      speedChanged(speed) {
        // console.log('speedChanged::speed=', speed);
        this.$store.commit('setCurrentSpeed', speed);
      },

      noOfTrainsChanged(noOfTrains) {
        // console.log('noOfTrainsChanged::noOfTrains=', noOfTrains);
        this.$store.commit('setCurrentNoOfTrains', noOfTrains);
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
  .inp {
    width: 100%;
  }
</style>
