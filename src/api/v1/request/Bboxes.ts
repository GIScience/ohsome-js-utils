import {Bbox} from './Bbox';
import {Boundaries} from './Boundaries';

class Bboxes extends Boundaries {

  boundaries: Bbox[] = [];

  constructor() {
    super();

  }

  static isBboxesString(value: string): boolean {
    const bboxes = value.split('|');
    return bboxes.reduce((previousValue, currentValue) => {
      return previousValue && Bbox.isBboxString(currentValue);
    }, true);
  }

  parse(value: string): Bboxes {
    const bboxes = value.split('|');

    console.log('this.boundaries', this.boundaries);

    bboxes.forEach((bboxString) => {

      if (Bbox.isBboxString(bboxString)) {
        const bbox = new Bbox().parse(bboxString);
        this.boundaries.push(bbox);
      }

    }, this);

    return this;
  }

}

export {Bboxes};
