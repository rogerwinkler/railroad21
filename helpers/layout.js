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
    this.accessPoints = this.calcAccessPoints();
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
const tileStraight = new Tile(
  "straight",
  ["1-3"],
  [],
  [],
  0,
  false,
  false,
  "img/tiles/straight.svg"
);
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

// Create tiles that need to be flipped
// and rotated...
const tileCurveR1 = cloneDeep(tileCurve);
tileCurveR1.name = "curve-r1";
tileCurveR1.rotationAngle = 90;
const tileCurveR2 = cloneDeep(tileCurve);
tileCurveR2.name = "curve-r2";
tileCurveR2.rotationAngle = 180;
const tileCurveR3 = cloneDeep(tileCurve);
tileCurveR3.name = "curve-r3";
tileCurveR3.rotationAngle = 270;
const tileStraightR1 = cloneDeep(tileStraight);
tileStraightR1.name = "straight-r1";
tileStraightR1.rotationAngle = 90;
const tileCurveNStraightR2 = cloneDeep(tileCurveNStraight);
tileCurveNStraightR2.name = "curv-n-straight-r2";
tileCurveNStraightR2.rotationAngle = 180;
const tileCurveNStraightFv = cloneDeep(tileCurveNStraight);
tileCurveNStraightFv.name = "curv-n-straight-fv";
tileCurveNStraightFv.flipVertical = true;
// const tileCurveNStraightR2 = cloneDeep(tileCurveNStraight);
// tileCurveNStraightR2.name = "curv-n-straight-r2";
// tileCurveNStraightR2.rotationAngle = 180;
const tileCurveNStraightFh = cloneDeep(tileCurveNStraight);
tileCurveNStraightFh.name = "curv-n-straight-fh";
tileCurveNStraightFh.flipHorizontal = true;

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
  [tileStraightR1, tileStraightR1, tileCurveNStraightFh, tileCurveNStraightFv],
  [tileStraightR1, tileStraightR1, tileCurveNStraight, tileCurveNStraightR2],
  [tileStraightR1, tileCurveR3, tileCurveR2, tileStraightR1],
  [tileCurveR3, tileStraight, tileStraight, tileCurveR2],
];

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
        console.log("transform=", transform);

        tile.setAttribute(
          "style",
          `position:absolute;left:${j * 100}px;top:${i * 100}px;${transform}`
        );
        content.appendChild(tile);
      }
    }
  }
}

export function cloneDeep(obj) {
  return JSON.parse(JSON.stringify(obj));
}
