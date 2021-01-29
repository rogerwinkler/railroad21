<template>
  <div class="content">
    <!-- <img
      class="four-curves"
      src="img/tiles/four-curves.svg"
      alt="four curves"
    />
    <img
      class="curve-n-straight"
      src="img/tiles/curve-n-straight.svg"
      alt="curves and straight"
    />
    <img
      class="two-curves-adj-n-straight"
      src="img/tiles/two-curves-adj-n-straight.svg"
      alt="two curves adjacent and straight"
    />
    <img
      class="two-curves-opp-n-straight"
      src="img/tiles/two-curves-opp-n-straight.svg"
      alt="two curves opposite and straight"
    />
    <img
      class="two-curves-adj-n-straight-across"
      src="img/tiles/two-curves-adj-n-straight-across.svg"
      alt="two curves opposite and straight across"
    />
    <img
      class="four-curves-n-straight"
      src="img/tiles/four-curves-n-straight.svg"
      alt="four curves and straight"
    />
    <img
      class="four-curves-n-cross"
      src="img/tiles/four-curves-n-cross.svg"
      alt="four curves and cross"
    />
    <img
      class="three-curves-n-straight"
      src="img/tiles/three-curves-n-straight.svg"
      alt="three curves and straight"
    />
    <img
      class="three-curves-n-cross"
      src="img/tiles/three-curves-n-cross.svg"
      alt="three curves and cross"
    /> -->
    <!-- <img
      class="two-curves-adj-n-cross"
      src="img/tiles/two-curves-adj-n-cross.svg"
      alt="two curves adjacent and cross"
    />
    <img
      class="two-curves-opp-n-cross"
      src="img/tiles/two-curves-opp-n-cross.svg"
      alt="two curves opposite and cross"
    /> -->
  </div>
</template>

<script>
import { Tile, layout1, layout2, createLayout } from "/helpers/layout";
export default {
  data() {
    return {
      grid: [],
    };
  },

  mounted() {
    // console.log("mounted");
    // Set page and adjust menu...
    this.$store.commit("setCurrentPage", "Railroad21");
    this.$store.commit("enableAllMenuItems");
    this.$store.commit("disableMenuItem", 0);

    // Listen if game is to be restarted...
    this.$root.$on("restart", this.restart);

    // Create tiles that need to be flipped
    // and rotated...
    // const tileCurveR1 = cloneDeep(tileCurve);
    // tileCurveR1.name = "curve-r1";
    // tileCurveR1.rotationAngle = 90;
    // const tileCurveR2 = cloneDeep(tileCurve);
    // tileCurveR2.name = "curve-r2";
    // tileCurveR2.rotationAngle = 180;
    // const tileCurveR3 = cloneDeep(tileCurve);
    // tileCurveR3.name = "curve-r3";
    // tileCurveR3.rotationAngle = 270;
    // const tileStraightR1 = cloneDeep(tileStraight);
    // tileStraightR1.name = "straight-r1";
    // tileStraightR1.rotationAngle = 90;
    // const tileCurveNStraightR2 = cloneDeep(tileCurveNStraight);
    // tileCurveNStraightR2.name = "curv-n-straight-r2";
    // tileCurveNStraightR2.rotationAngle = 180;
    // const tileCurveNStraightFv = cloneDeep(tileCurveNStraight);
    // tileCurveNStraightFv.name = "curv-n-straight-fv";
    // tileCurveNStraightFv.flipVertical = true;

    // this.grid[0] = [tileCurve, tileStraight, tileCurveR1];
    // this.grid[1] = [tileStraightR1, tileCurve, tileCurveNStraightR2];
    // this.grid[2] = [tileStraightR1, tileStraightR1, tileStraightR1];
    // this.grid[3] = [tileStraightR1, tileCurveR3, tileCurveNStraightFv];
    // this.grid[4] = [tileCurveR3, tileStraight, tileCurveR2];
    // console.log("grid=", this.grid);

    createLayout(layout2, ".content");

    // Create HTML img elements...
    // const content = document.querySelector(".content");
    // for (let i = 0; i < this.grid.length; i++) {
    //   for (let j = 0; j < this.grid[i].length; j++) {
    //     if (!!this.grid[i][j]) {
    //       let tile = document.createElement("img");
    //       tile.classList.add(this.grid[i][j].name);
    //       tile.setAttribute("src", this.grid[i][j].imageUrl);
    //       tile.setAttribute("alt", this.grid[i][j].name);

    //       // Create transformation string...
    //       let transform = "";
    //       if (this.grid[i][j].flipHorizontal) transform += " scaleY(-1)";
    //       if (this.grid[i][j].flipVertical) transform += " scaleX(-1)";
    //       if (this.grid[i][j].rotationAngle !== 0)
    //         transform += ` rotate(${this.grid[i][j].rotationAngle}deg)`;
    //       if (transform.length > 0) transform = "transform:" + transform + ";";
    //       console.log("transform=", transform);

    //       tile.setAttribute(
    //         "style",
    //         `position:absolute;left:${j * 100}px;top:${i * 100}px;${transform}`
    //       );
    //       content.appendChild(tile);
    //     }
    //   }
    // }
  },

  methods: {
    restart() {
      console.log("restart");
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
.content img {
  position: absolute;
}
.cross {
  left: 0px;
  top: 0px;
}
.straight {
  left: 100px;
  top: 0px;
}
.curve {
  left: 200px;
  top: 0px;
  /* transform: rotate(90deg); */
}
.two-curves-adj {
  left: 0px;
  top: 100px;
  transform: scaleY(-1);
}
.two-curves-opp {
  left: 100px;
  top: 100px;
}
.three-curves {
  left: 200px;
  top: 100px;
}
.four-curves {
  left: 0px;
  top: 200px;
}
.curve-n-straight {
  left: 100px;
  top: 200px;
}
.two-curves-adj-n-straight {
  left: 200px;
  top: 200px;
}
.two-curves-opp-n-straight {
  left: 0px;
  top: 300px;
}
.two-curves-adj-n-straight-across {
  left: 100px;
  top: 300px;
}
.four-curves-n-straight {
  left: 200px;
  top: 300px;
}
.four-curves-n-cross {
  left: 0px;
  top: 400px;
}
.three-curves-n-straight {
  left: 100px;
  top: 400px;
  transform: scaleX(-1) rotate(-90deg);
}
.three-curves-n-cross {
  left: 200px;
  top: 400px;
}
.two-curves-adj-n-cross {
  left: 300px;
  top: 0px;
}
.two-curves-opp-n-cross {
  left: 300px;
  top: 100px;
}
</style>
