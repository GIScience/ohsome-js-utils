import {Boundary} from "./Boundary";
import {BBOX} from "../format/RegExpConstants";

class Bbox extends Boundary {

  constructor() {
    super();
  }


  static isBboxString(value: string): boolean {

    // const regex = /^(([^:|]+):)?\s*([-+]?[0-9]*\.?[0-9]+([eE][-+]?[0-9]+)?)\s*,\s*([-+]?[0-9]*\.?[0-9]+([eE][-+]?[0-9]+)?)\s*,\s*([-+]?[0-9]*\.?[0-9]+([eE][-+]?[0-9]+)?)\s*,\s*([-+]?[0-9]*\.?[0-9]+([eE][-+]?[0-9]+)?)\s*$/g;
    const regexResult = new RegExp(BBOX, 'g').exec(value);

    if (regexResult == null) {
      return false;
    }

    // let point1 = regexResult[3];
    // let point2 = regexResult[4];
    const pointsAreValid = true; // todo check geometry validity

    return pointsAreValid;
  }

  parse(value: string): Bbox {

    value = value.trim();

    if (!Bbox.isBboxString(value)) {
      throw new Error(`Unvalid bbox format: ${value}. Should be id:x1,y1,x2,y2 or x1,y1,x2,y2`);
    }

    const regexResult = new RegExp(BBOX, 'g').exec(value);
    this.id = regexResult[1];
    this.geometry = regexResult[2];

    return this;
  }

}

export {Bbox};
