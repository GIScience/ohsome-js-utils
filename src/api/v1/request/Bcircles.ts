import {Boundaries} from './Boundaries';
import {Bcircle} from './Bcircle';

class Bcircles extends Boundaries {

  boundaries: Bcircle[] = [];

  constructor() {
    super();

  }

  static isBcirclesString(value: string): boolean {
    const bcircles = value.split('|');
    return bcircles.reduce((previousValue, currentValue) => {
      return previousValue && Bcircle.isBcircleString(currentValue);
    }, true);
  }

  parse(value: string): Bcircles {
    const bcircles = value.split('|');

    console.log('this.boundaries', this.boundaries);

    bcircles.forEach((bcircleString) => {

      if (Bcircle.isBcircleString(bcircleString)) {
        const bcircle = new Bcircle().parse(bcircleString);
        this.boundaries.push(bcircle);
      }

    }, this);

    return this;
  }

}

export {Bcircles}
