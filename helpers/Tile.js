/**
 * R21 DATA MODEL
 * ==============
 *
 * A TILE is a quadratic piece that can be added to the railroad
 * track layout.
 *
 *               0
 *        +------o------+
 *        |      |0     |
 *        | 1  4/|\3    |
 *      3 o------|------o 1
 *        |    5\|/2    |
 *        |      |      |
 *        +------o------+
 *               2
 *
 * - It consists of the four access points 0..3 (north, east, south,
 *   west) and...
 * - ...the 6 segments 0..5 where each segments joins two access
 *   points like this...
 *   - segment 0 = 0 -> 2
 *   - segment 1 = 3 -> 1
 *   - segment 2 = 2 -> 1
 *   - segment 3 = 1 -> 0
 *   - segment 4 = 0 -> 3
 *   - segment 5 = 3 -> 2
 * - NOTE: Segments are not directed, thus 0->2 equals 2->0!
 * - Entry points and segments are represented in strings
 *   where an x marks the presence and a - marks the absence
 *   of a segment or point. Example: segments = "x--x--" indicates
 *   that segment 0 and 3 are available in the tile.
 * - If more than one segment join in an access point, there is a switch.
 *   The state of a switch can be one of s (straight), l (left), r (right)
 *   or - (undefined). A train entering the tile on that access point
 *   travels according to the switch's state. If the state is undefined
 *   the train selects a segment by random.
 *
 */
export class Tile {
  segments = "------"; // 0..5, each character in the string representing one of the six segments of a tile.
  insulations = "----"; // 0..3, access points can be insulated to prevent power to move through.
  poweredSegments = "------"; // 0..5 indicates segments with access to power.
  accessPoints = "----"; // 0..3 access points are derived from the segments.
  switchState = "----"; // 0..3 current state of switches.

  constructor(segments, insulations, poweredSegments, switchState) {
    this.segments = segments;
    this.insulations = insulations;
    this.poweredSegments = poweredSegments;
    this.switchState = switchState;
    this.accessPoints = this.calcAccessPoints();
  }

  calcAccessPoints() {
    // console.log("calcAccessPoints");
    let accPoints = "----";

    function replaceAt(str, idx, char) {
      return str.substr(0, idx) + char + str.substr(idx + 1);
    }

    if (this.segments[0] === "x") {
      accPoints = replaceAt(accPoints, 0, "x");
      accPoints = replaceAt(accPoints, 2, "x");
    }
    if (this.segments[1] === "x") {
      accPoints = replaceAt(accPoints, 3, "x");
      accPoints = replaceAt(accPoints, 1, "x");
    }
    if (this.segments[2] === "x") {
      accPoints = replaceAt(accPoints, 2, "x");
      accPoints = replaceAt(accPoints, 1, "x");
    }
    if (this.segments[3] === "x") {
      accPoints = replaceAt(accPoints, 1, "x");
      accPoints = replaceAt(accPoints, 0, "x");
    }
    if (this.segments[4] === "x") {
      accPoints = replaceAt(accPoints, 0, "x");
      accPoints = replaceAt(accPoints, 3, "x");
    }
    if (this.segments[5] === "x") {
      accPoints = replaceAt(accPoints, 3, "x");
      accPoints = replaceAt(accPoints, 2, "x");
    }
    // console.log("accPoints=", accPoints);
    return accPoints;
  }
}
