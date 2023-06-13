import {Boundary} from "./Boundary";
import {BCIRCLE} from "../format/RegExpConstants";

class Bcircle extends Boundary {

  constructor() {
    super();
  }

  static isBcircleString(value: string): boolean {

    // const regex = /^(([^:|]+):)?\s*([-+]?[0-9]*\.?[0-9]+([eE][-+]?[0-9]+)?)\s*,\s*([-+]?[0-9]*\.?[0-9]+([eE][-+]?[0-9]+)?)\s*,\s*(\+?[0-9]*\.?[0-9]+([eE][-+]?[0-9]+)?)\s*$/g;
    const regexResult = new RegExp(BCIRCLE, 'g').exec(value);

    if (regexResult == null) {
      return false;
    }

    const point = regexResult[3];
    const pointIsValid = true; // todo check geometry validity

    const radius = parseFloat(regexResult[4]);
    const radiusIsPositive = radius > 0;

    return pointIsValid && radiusIsPositive;

  }

  get lng(): number {
    return parseFloat(this.geometry.split(',')[0]);
  }

  get lat(): number {
    return parseFloat(this.geometry.split(',')[1]);
  }

  get radius(): number {
    return parseFloat(this.geometry.split(',')[2]);
  }

  parse(value: string): Bcircle {

    value = value.trim();

    if (!Bcircle.isBcircleString(value)) {
      throw new Error(`Unvalid bcircle format: ${value}. Should be id:x1,y1,radius or x1,y1,radius`);
    }

    const regexResult = new RegExp(BCIRCLE, 'g').exec(value);

    this.id = regexResult[1];
    this.geometry = regexResult[2];

    return this;
  }
}

export {Bcircle};
