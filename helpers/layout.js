export class Tile {
  // A TILE is a quadratic piece that can be added to the railroad track layout.
  // It consists of the 4 edges N(orth), E(ast), S(outh) and W(est). Trains can
  // enter and exit TILES on the 4 mid-points of these edges only and only if
  // there are tracks from one mid-point to another mid-point. A track from one
  // mid-point to another mid-point is called a SEGMENT. The 4 mid-points are
  // numbered from 0 to 3, starting north (0) going clock-wise up to west (3).
  // Thus the following numbers identify the mid-points like this...
  //
  // north:   0
  // east:    1
  // south:   2
  // west:    3
  //
  // A SEGMENT is a track between two mid-points and is noted by a string as
  // in this example: '0-2' defines the SEGMENT/track from mid-point 0 (north) to
  // mid-point 2 (south). SEGMENTS is an array of strings, for instance
  // ['0-2', '0-3'].
  //
  // INSULATIONS declare mid-points that hold power from running through them. It
  // is an array of numbers, for instance [0, 3].
  //
  // POWERED SEGMENTS are SEGMENTS that are attached to a power switch. They
  // receive power if the power switch is on, none if the switch is off. POWERED
  // SEGMENTS is an array of strings, for instance ['1-3', '0-2', '2-3'].
  //
  // ACCESS POINTS are the mid-points that are end-points of SEGMENTS. They are
  // calculated from the SEGMENTS. They are called ACCESS POINTS because trains
  // can access (and leave) the TILE through these points. ACCESS POINTS is an
  // array of numbers, for instance [1, 2, 3].
  //
  // ROTATION ANGLE are the degrees in which a TILE is rotated. The ROTATION ANGLE
  // must be 0 or a positive or negative multiple of 90, e.g. 0, 90, 180, 270, -90,
  // -180, -270. Positive angles indicate a clockwise rotation, minus a
  // counter-clockwise rotation.
  //
  // FLIP HORIZONTAL and FLIP VERTICAL flip the TILE accordingly. These variables
  // are TRUE if the TILE is to be flipped, FALSE otherwise.

  name = "";
  segments = [];
  insulations = [];
  poweredSegments = [];
  accessPoints = [];
  rotationAngle = 0;
  flipHorizontal = false;
  flipVertical = false;
  imageUrl = null;

  constructor(
    name,
    segments,
    insulations,
    poweredSegments,
    rotationAngle,
    flipHorizontal,
    flipVertical,
    imageUrl
  ) {
    this.name = name;
    this.segments = segments;
    this.insulations = insulations;
    this.poweredSegments = poweredSegments;
    this.rotationAngle = rotationAngle;
    this.flipHorizontal = flipHorizontal;
    this.flipVertical = flipVertical;
    this.imageUrl = imageUrl;
    this.accessPoints = this.calcAccessPoints().sort();
  }

  calcAccessPoints() {
    const accPointArr = [];
    for (let i = 0; i < this.segments.length; i++) {
      if (accPointArr.indexOf(this.segments[i][0] === -1)) {
        accPointArr.push(this.segments[i][0]);
      }
      if (accPointArr.indexOf(this.segments[i][2] === -1)) {
        accPointArr.push(this.segments[i][2]);
      }
    }
    return accPointArr;
  }
}

//---------------------------------------------
//
//               0
//        +------o------+
//        |      |      |
//        |      |      |
//      3 o------+------o 1
//        |      |      |
//        |      |      |
//        +------o------+
//               2
//
const tileCross = new Tile(
  "cross",
  [("0-2", "1-3")],
  [],
  [],
  0,
  false,
  false,
  "img/tiles/cross.svg"
);

//---------------------------------------------
//
//               0
//        +-------------+
//        |             |
//        |             |
//      3 o-------------o 1
//        |             |
//        |             |
//        +-------------+
//               2
//

const tileStraight = new Tile(
  "straight",
  ["3-1"],
  [],
  [],
  0,
  false,
  false,
  "img/tiles/straight.svg"
);

//---------------------------------------------
//
//               0
//        +------o------+
//        |      |      |
//        |      |      |
//      3 |      |      | 1
//        |      |      |
//        |      |      |
//        +------o------+
//               2
//
const tileStraightR1 = new Tile(
  "straight-r1",
  ["2-0"],
  [],
  [],
  90,
  false,
  false,
  "img/tiles/straight.svg"
);

//---------------------------------------------
//
//               0
//        +-------------+
//        |             |
//        |             |
//      3 |         ----o 1
//        |       /     |
//        |      |      |
//        +------o------+
//               2
//
const tileCurve = new Tile(
  "curve",
  ["1-2"],
  [],
  [],
  0,
  false,
  false,
  "img/tiles/curve.svg"
);

//---------------------------------------------
//
//               0
//        +-------------+
//        |             |
//        |             |
//      3 o----         | 1
//        |     \       |
//        |      |      |
//        +------o------+
//               2
//
const tileCurveR1 = new Tile(
  "curve",
  ["2-3"],
  [],
  [],
  90,
  false,
  false,
  "img/tiles/curve.svg"
);

//---------------------------------------------
//
//               0
//        +------o------+
//        |      |      |
//        |     /       |
//      3 o----         | 1
//        |             |
//        |             |
//        +-------------+
//               2
//
const tileCurveR2 = new Tile(
  "curve",
  ["3-0"],
  [],
  [],
  180,
  false,
  false,
  "img/tiles/curve.svg"
);

//---------------------------------------------
//
//               0
//        +------o------+
//        |      |      |
//        |       \     |
//      3 |         ----o 1
//        |             |
//        |             |
//        +-------------+
//               2
//
const tileCurveR3 = new Tile(
  "curve",
  ["0-1"],
  [],
  [],
  270,
  false,
  false,
  "img/tiles/curve.svg"
);

//---------------------------------------------
//
//               0
//        +------o------+
//        |      |      |
//        |      |      |
//      3 |      |  ----o 1
//        |      |/     |
//        |      |      |
//        +------o------+
//               2
//
const tileCurveNStraight = new Tile(
  "curve-n-straight",
  ["0-2", "1-2"],
  [],
  [],
  0,
  false,
  false,
  "img/tiles/curve-n-straight.svg"
);

//---------------------------------------------
//
//               0
//        +------o------+
//        |             |
//        |             |
//      3 |-------------o 1
//        |     \       |
//        |      |      |
//        +------o------+
//               2
//
const tileCurveNStraightR1 = new Tile(
  "curve-n-straight-r1",
  ["3-1", "3-2"],
  [],
  [],
  90,
  false,
  false,
  "img/tiles/curve-n-straight.svg"
);

//---------------------------------------------
//
//               0
//        +------o------+
//        |      |      |
//        |     /|      |
//      3 o----  |      | 1
//        |      |      |
//        |      |      |
//        +------o------+
//               2
//
const tileCurveNStraightR2 = new Tile(
  "curve-n-straight-r2",
  ["0-2", "0-3"],
  [],
  [],
  180,
  false,
  false,
  "img/tiles/curve-n-straight.svg"
);

//---------------------------------------------
//
//               0
//        +------o------+
//        |      |      |
//        |       \     |
//      3 o-------------o 1
//        |             |
//        |             |
//        +-------------+
//               2
//
const tileCurveNStraightR3 = new Tile(
  "curve-n-straight-r3",
  ["0-1", "1-3"],
  [],
  [],
  270,
  false,
  false,
  "img/tiles/curve-n-straight.svg"
);

//---------------------------------------------
//
//               0
//        +------o------+
//        |      |      |
//        |      |      |
//      3 o----  |      | 1
//        |     \|      |
//        |      |      |
//        +------o------+
//               2
//
const tileCurveNStraightFv = new Tile(
  "curve-n-straight-fv",
  ["2-0", "2-3"],
  [],
  [],
  0,
  false,
  true,
  "img/tiles/curve-n-straight.svg"
);

//---------------------------------------------
//
//               0
//        +------o------+
//        |      |      |
//        |     /       |
//      3 o-------------o 1
//        |             |
//        |             |
//        +-------------+
//               2
//
const tileCurveNStraightR3Fv = new Tile(
  "curve-n-straight-r3-fv",
  ["3-1", "3-0"],
  [],
  [],
  270,
  false,
  true,
  "img/tiles/curve-n-straight.svg"
);

//---------------------------------------------
//
//               0
//        +------o------+
//        |      |      |
//        |      |\     |
//      3 |      |  ----o 1
//        |      |      |
//        |      |      |
//        +------o------+
//               2
//
const tileCurveNStraightR2Fv = new Tile(
  "curve-n-straight-r2-fv",
  ["0-1", "0-2"],
  [],
  [],
  180,
  false,
  true,
  "img/tiles/curve-n-straight.svg"
);

//---------------------------------------------
//
//               0
//        +-------------+
//        |             |
//        |             |
//      3 o-------------o 1
//        |       /     |
//        |      |      |
//        +------o------+
//               2
//
const tileCurveNStraightR3Fh = new Tile(
  "curve-n-straight-r3-fh",
  ["1-2", "1-3"],
  [],
  [],
  270,
  true,
  false,
  "img/tiles/curve-n-straight.svg"
);

//---------------------------------------------
//
//               0
//        +-------------+
//        |             |
//        |             |
//      3 o-------------o 1
//        |     \|/     |
//        |      |      |
//        +------o------+
//               2
//
const tileTwoCurvesAdjNStraightAcross = new Tile(
  "two-curves-adj-n-straight-across",
  ["2-1", "2-3", "3-1"],
  [],
  [],
  0,
  false,
  false,
  "img/tiles/two-curves-adj-n-straight-across.svg"
);

//---------------------------------------------
//
//               0
//        +------o------+
//        |      |      |
//        |     /|      |
//      3 o----- |      | 1
//        |     \|      |
//        |      |      |
//        +------o------+
//               2
//
const tileTwoCurvesAdjNStraightAcrossR1 = new Tile(
  "two-curves-adj-n-straight-across-r1",
  ["2-3", "2-0", "3-0"],
  [],
  [],
  90,
  false,
  false,
  "img/tiles/two-curves-adj-n-straight-across.svg"
);

//---------------------------------------------
//
//               0
//        +------o------+
//        |      |      |
//        |     / \     |
//      3 o-------------o 1
//        |             |
//        |             |
//        +-------------+
//               2
//
const tileTwoCurvesAdjNStraightAcrossR2 = new Tile(
  "two-curves-adj-n-straight-across-r2",
  ["0-1", "0-3", "3-1"],
  [],
  [],
  180,
  false,
  false,
  "img/tiles/two-curves-adj-n-straight-across.svg"
);

//---------------------------------------------
//
//               0
//        +------o------+
//        |      |      |
//        |      |\     |
//      3 |      |  ----o 1
//        |      |/     |
//        |      |      |
//        +------o------+
//               2
//
const tileTwoCurvesAdjNStraightAcrossR3 = new Tile(
  "two-curves-adj-n-straight-across-r3",
  ["1-0", "1-2", "0-2"],
  [],
  [],
  270,
  false,
  false,
  "img/tiles/two-curves-adj-n-straight-across.svg"
);

//---------------------------------------------
//
//               0
//        +------o------+
//        |      |      |
//        |      |      |
//      3 o----  |  ----o 1
//        |     \|/     |
//        |      |      |
//        +------o------+
//               2
//
const tileTwoCurvesAdjNStraight = new Tile(
  "two-curves-adj-n-straight",
  ["2-1", "2-3", "2-0"],
  [],
  [],
  0,
  false,
  false,
  "img/tiles/two-curves-adj-n-straight.svg"
);

//---------------------------------------------
//
//               0
//        +------o------+
//        |      |      |
//        |     /       |
//      3 o-------------o 1
//        |     \       |
//        |      |      |
//        +------o------+
//               2
//
const tileTwoCurvesAdjNStraightR1 = new Tile(
  "two-curves-adj-n-straight-r1",
  ["3-2", "3-0", "3-1"],
  [],
  [],
  90,
  false,
  false,
  "img/tiles/two-curves-adj-n-straight.svg"
);

//---------------------------------------------
//
//               0
//        +------o------+
//        |      |      |
//        |     /|\     |
//      3 o----  |  ----o 1
//        |      |      |
//        |      |      |
//        +------o------+
//               2
//
const tileTwoCurvesAdjNStraightR2 = new Tile(
  "two-curves-adj-n-straight-r2",
  ["0-1", "0-2", "0-3"],
  [],
  [],
  180,
  false,
  false,
  "img/tiles/two-curves-adj-n-straight.svg"
);

//---------------------------------------------
//
//               0
//        +------o------+
//        |      |      |
//        |       \     |
//      3 o-------------o 1
//        |       /     |
//        |      |      |
//        +-------------+
//               2
//
const tileTwoCurvesAdjNStraightR3 = new Tile(
  "two-curves-adj-n-straight-r3",
  ["1-0", "1-3", "1-2"],
  [],
  [],
  270,
  false,
  false,
  "img/tiles/two-curves-adj-n-straight.svg"
);

export const layout1 = [
  [tileCurve, tileStraight, tileCurveR1],
  [tileStraightR1, tileCurve, tileCurveNStraightR2],
  [tileStraightR1, tileStraightR1, tileStraightR1],
  [tileStraightR1, tileCurveR3, tileCurveNStraightFv],
  [tileCurveR3, tileStraight, tileCurveR2],
];

export const layout2 = [
  [tileCurve, tileStraight, tileStraight, tileCurveR1],
  [tileStraightR1, tileCurve, tileCurveR1, tileStraightR1],
  [
    tileStraightR1,
    tileStraightR1,
    tileCurveNStraightR2Fv,
    tileCurveNStraightFv,
  ],
  [tileStraightR1, tileStraightR1, tileCurveNStraight, tileCurveNStraightR2],
  [tileStraightR1, tileCurveR3, tileCurveR2, tileStraightR1],
  [tileCurveR3, tileStraight, tileStraight, tileCurveR2],
];

export const layout3 = [
  [tileCurve, tileStraight, tileStraight, tileCurveR1],
  [tileStraightR1, tileCurve, tileCurveR1, tileStraightR1],
  [
    tileStraightR1,
    tileStraightR1,
    tileTwoCurvesAdjNStraightAcrossR3,
    tileTwoCurvesAdjNStraightAcrossR1,
  ],
  [tileStraightR1, tileStraightR1, tileStraightR1, tileStraightR1],
  [
    tileStraightR1,
    tileStraightR1,
    tileTwoCurvesAdjNStraightAcrossR3,
    tileTwoCurvesAdjNStraightAcrossR1,
  ],
  [tileStraightR1, tileCurveR3, tileCurveR2, tileStraightR1],
  [tileCurveR3, tileStraight, tileStraight, tileCurveR2],
];

/**
 * x and y offsets to position train in the middle of
 * the tracks (left) and let top to be the top position
 * of the train...
 */
let trainTranslateX;
let trainTranslateY;

// ----------------------------------------------------

export function createLayout(layout, containerSelector) {
  const content = document.querySelector(containerSelector);
  for (let i = 0; i < layout.length; i++) {
    for (let j = 0; j < layout[i].length; j++) {
      if (!!layout[i][j]) {
        let tile = document.createElement("img");
        tile.classList.add(layout[i][j].name);
        tile.setAttribute("src", layout[i][j].imageUrl);
        tile.setAttribute("alt", layout[i][j].name);

        // Create transformation string...
        let transform = "";
        if (layout[i][j].flipHorizontal) transform += " scaleY(-1)";
        if (layout[i][j].flipVertical) transform += " scaleX(-1)";
        if (layout[i][j].rotationAngle !== 0)
          transform += ` rotate(${layout[i][j].rotationAngle}deg)`;
        if (transform.length > 0) transform = "transform:" + transform + ";";
        // console.log("transform=", transform);

        tile.setAttribute(
          "style",
          `position:absolute;left:${j * 100}px;top:${i * 100}px;${transform}`
        );
        content.appendChild(tile);
      }
    }
  }
}

// ----------------------------------------------------

export function createTrain(containerSelector, x, y) {
  console.log("createTrain");
  // Train offsets to center train on tracks
  // depending on train.svg definition...
  trainTranslateX = -50;
  trainTranslateY = -50;
  const content = document.querySelector(containerSelector);
  let train = document.createElement("img");
  train.classList.add("train");
  train.setAttribute("src", "img/tiles/train.svg");
  train.setAttribute("alt", "train");
  train.setAttribute(
    "style",
    `position:absolute;left:${x + trainTranslateX}px;top:${
      y + trainTranslateY
    }px;`
  );
  // train.setAttribute(
  //   "style",
  //   `position:absolute;left:0px;top:0px;transform:rotate(270deg)`
  // );
  content.appendChild(train);
  return train;
}

// ----------------------------------------------------

var endReachedEvent = new Event("endreached");

/**
 *
 * @param {htmlElem} train The HTML element to be moved on the tracks.
 * @param {String} segment Segment vector from start to end point (directed!!!).
 * @param {number} x1 X-coordinate of starting point (x1, y1)
 * @param {number} y1 Y-coordinate of starting point (x1, y1)
 * @param {number} x2 X-coordinate of end point (x2, y2)
 * @param {number} y2 Y-coordinate of end point (x2, y2)
 * @param {numer} intervalInMs Time in ms the train travels the 'distPerInterval'
 * @param {number} distPerIntervalInPx Distance the train travels during one 'intervalInMs'
 */
export function moveTrain(
  train,
  segment,
  x1,
  y1,
  x2,
  y2,
  intervalInMs,
  distPerIntervalInPx
) {
  console.log("layout.js::moveTrain::segment=", segment);

  // The radius depends on the dimensions in the actual graphics
  // file (.svg) and possible scaling applied in layouts. Its the
  // radius of track cuves (bends)...
  const radius = 50;
  // The distance in degrees a train travels on a circle of the
  // given radius in the given 'intervalInMx' and the 'distPerInteralInPx'.
  const degPerInterval = (distPerIntervalInPx * 180) / (50 * Math.PI);
  let left = x1; // Left position of train
  let top = y1; // Top position of train
  let direction = ""; // direction in which train is headed. One of ('straight', 'arc-left', 'arc-right').
  let incX; // Increment in px on x-axis a train travels during an 'intervalInMs'.
  let incY; // Increment in px on y-axis a train travels during
  let degXY = 0; // The angle indicating the position of the train when on a circle segment.
  let rotationInDeg = 0; // The rotation of the train at pos degXY.
  const scaleInc = 1; // Scale factor to be applied, must correspond with the scaling factor of the layouts.

  console.log(`x1=${x1}, y1=${y1}, x2=${x2}, y2=${y2}`);

  switch (segment) {
    case "0-2":
      direction = "straight";
      incX = 0;
      incY = distPerIntervalInPx * scaleInc;
      rotationInDeg = 180;
      break;
    case "2-0":
      direction = "straight";
      incX = 0;
      incY = -distPerIntervalInPx * scaleInc;
      rotationInDeg = 0;
      break;
    case "3-1":
      direction = "straight";
      incX = distPerIntervalInPx * scaleInc;
      incY = 0;
      rotationInDeg = 90;
      break;
    case "1-3":
      direction = "straight";
      incX = -distPerIntervalInPx * scaleInc;
      incY = 0;
      rotationInDeg = 270;
      break;
    case "0-3":
      direction = "arc-right";
      incX = -distPerIntervalInPx * scaleInc;
      incY = distPerIntervalInPx * scaleInc;
      break;
    case "3-2":
      direction = "arc-right";
      incX = distPerIntervalInPx * scaleInc;
      incY = distPerIntervalInPx * scaleInc;
      break;
    case "2-1":
      direction = "arc-right";
      incX = distPerIntervalInPx * scaleInc;
      incY = -distPerIntervalInPx * scaleInc;
      break;
    case "1-0":
      direction = "arc-right";
      incX = -distPerIntervalInPx * scaleInc;
      incY = -distPerIntervalInPx * scaleInc;
      break;
    case "0-1":
      direction = "arc-left";
      incX = distPerIntervalInPx * scaleInc;
      incY = distPerIntervalInPx * scaleInc;
      break;
    case "1-2":
      direction = "arc-left";
      incX = -distPerIntervalInPx * scaleInc;
      incY = distPerIntervalInPx * scaleInc;
      break;
    case "2-3":
      direction = "arc-left";
      incX = -distPerIntervalInPx * scaleInc;
      incY = -distPerIntervalInPx * scaleInc;
      break;
    case "3-0":
      direction = "arc-left";
      incX = distPerIntervalInPx * scaleInc;
      incY = -distPerIntervalInPx * scaleInc;
      break;
  }

  console.log(`incX=${incX}, incY=${incY}`);
  console.log("segment=", segment);
  console.log("direction=", direction);

  if (segment === "" || direction === "") {
    console.error("Calculation error in moveTrain()");
    return;
  }

  function move() {
    // console.log("move");
    train.setAttribute(
      "style",
      `position:absolute;left:${left + trainTranslateX}px;top:${
        top + trainTranslateY
      }px;transform:rotate(${rotationInDeg}deg);`
    );

    if (direction === "straight") {
      left = left + incX;
      top = top + incY;
    } else {
      degXY += degPerInterval;
      // console.log("degXY=", degXY);
      let { x, y } = calcOffsetsfromAngle(degXY, radius);
      // console.log(`x=${x}, y=${y}`);
      if (direction === "arc-right") {
        switch (segment[0]) {
          case "3":
            left = x1 + y;
            top = y1 + radius - x;
            rotationInDeg = 90 + degXY;
            break;
          case "0":
            left = x1 - radius + x;
            top = y1 + y;
            rotationInDeg = 180 + degXY;
            break;
          case "1":
            left = x1 - y;
            top = y1 - radius + x;
            rotationInDeg = 270 + degXY;
            break;
          case "2":
            left = x1 + radius - x;
            top = y1 - y;
            rotationInDeg = degXY;
            break;
        }
      } else if (direction === "arc-left") {
        switch (segment[0]) {
          case "3":
            left = x1 + y;
            top = y1 - radius + x;
            rotationInDeg = 90 - degXY;
            break;
          case "0":
            left = x1 + radius - x;
            top = y1 + y;
            rotationInDeg = 180 - degXY;
            break;
          case "1":
            left = x1 - y;
            top = y1 + radius - x;
            rotationInDeg = 270 - degXY;
            break;
          case "2":
            left = x1 - radius + x;
            top = y1 - y;
            rotationInDeg = -degXY;
            break;
        }
      }
      // console.log(`left=${left}, top=${top}`);
    }

    // console.log(`left=${left}, top=${top}`);

    if (
      (incX < 0 && left <= x2) ||
      (incX > 0 && left >= x2) ||
      (incY < 0 && top <= y2) ||
      (incY > 0 && top >= y2)
    ) {
      console.log("moveTrain::end reached");
      document.dispatchEvent(endReachedEvent);
    } else {
      new Promise(function (resolve) {
        setTimeout(() => resolve(1), intervalInMs);
      }).then(move);
    }
  }
  move();
}

// ----------------------------------------------------

/**
 * Calculate the offsets of a point on a circle centered at (0,0)
 * with radius 'radius' on x- and y-axis returning an object {x, y}.
 * @param {number} alpha The angle in degrees.
 * @param {number} radius The radius in px.
 */
function calcOffsetsfromAngle(alpha, radius) {
  // console.log(`calcOffsetsfromAngle::alpha=${alpha}, radius=${radius}`);

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
}

// ----------------------------------------------------

export function switchSegmentDirection(segment) {
  return segment[2] + segment[1] + segment[0];
}

// ----------------------------------------------------

/**
 * Find all segments on a tile from a certain pos (0..3).
 * The returned segments will be directed in direction away
 * from pos (0..3 => n..w).
 */
export function findSegmentsFromPos(tile, pos) {
  let arr = [];
  for (let i = 0; i < tile.segments.length; i++) {
    let posInSeg = tile.segments[i].indexOf(pos.toString());
    if (posInSeg === 2) {
      arr.push(switchSegmentDirection(tile.segments[i]));
    } else if (posInSeg === 0) {
      arr.push(tile.segments[i]);
    }
  }
  return arr;
}

// ----------------------------------------------------

export function posOnTileToCoords(tileX, tileY, pos) {
  console.log(`posOnTileToCoords::tileX=${tileX}, tileY=${tileY}, pos=${pos}`);
  let x;
  let y;
  switch (pos) {
    case 0:
      x = tileX * 100 + 50;
      y = tileY * 100;
      break;
    case 1:
      x = tileX * 100 + 100;
      y = tileY * 100 + 50;
      break;
    case 2:
      x = tileX * 100 + 50;
      y = tileY * 100 + 100;
      break;
    case 3:
      x = tileX * 100;
      y = tileY * 100 + 50;
      break;
  }
  return {
    x,
    y,
  };
}

// ----------------------------------------------------

export function cloneDeep(obj) {
  return JSON.parse(JSON.stringify(obj));
}

// ----------------------------------------------------

/**
 * Returns a random integer between min (inclusive) and max (inclusive).
 * The value is no lower than min (or the next integer greater than min
 * if min isn't an integer) and no greater than max (or the next integer
 * lower than max if max isn't an integer).
 * Using Math.round() will give you a non-uniform distribution!
 */
export function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// ----------------------------------------------------
