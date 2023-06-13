import {Boundary} from "./Boundary";
import {BPOLY} from "../format/RegExpConstants";

class Bpoly extends Boundary {

  constructor() {
    super();
  }


  static isBpolyString(value: string): boolean {

    // BPOLY:
    // checks for id not to contain : or |
    // checks for all numbers to be floats:
    // with or without sign
    // with or without decimal part
    // with optional scientific notation with signed E or e
    // checks for an even number of floats with minimum of 8 times
    //capture groups:
    // 1: id: string
    // 2: geometry: string
    // 3: firstCoordPair: string , e.g '1,1'
    // 4: lastCoordPair: string, e.g. '1, 1'


    const regexResult = new RegExp(BPOLY, 'g').exec(value);  // this.regex.exec(value);

    if (regexResult == null) {
      return false;
    }

    // first two number must be equal to the last two numbers (polygon must be closed)
    const firstCoord = regexResult[3].split(',').map(parseFloat);
    const lastCoord = regexResult[4].split(',').map(parseFloat);

    const isClosed = firstCoord[0] === lastCoord[0] && firstCoord[1] === lastCoord[1];

    return isClosed;

  }

  parse(value: string): Bpoly {

    value = value.trim();

    if (!Bpoly.isBpolyString(value)) {
      throw new Error(`Unvalid bpoly format: ${value}. Should be id:x1,y1,xn-1,yn-1,x1,y1 or x1,y1,xn-1,yn-1,x1,y1`);
    }

    const regexResult = new RegExp(BPOLY, 'g').exec(value);

    this.id = regexResult[1];
    this.geometry = regexResult[2];
    // todo check validity of geometry (lng -180 to 180; lat -90 to 90)

    return this;
  }
}

export {Bpoly};
