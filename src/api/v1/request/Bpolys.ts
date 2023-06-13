import {Boundaries} from './Boundaries';
import {Bpoly} from './Bpoly';

class Bpolys extends Boundaries {

  boundaries: Bpoly[] = [];

  constructor() {
    super();

  }

  static isBPolysString(value: string): boolean {
    const bpolys = value.split('|');
    return bpolys.reduce((previousValue, currentValue) => {
      return previousValue && Bpoly.isBpolyString(currentValue);
    }, true);
  }

  parse(value: string): Bpolys {
    const bpolys = value.split('|');

    bpolys.forEach((bpolyString) => {

      if (Bpoly.isBpolyString(bpolyString)) {
        const bpoly = new Bpoly().parse(bpolyString);
        this.boundaries.push(bpoly);
      }

    }, this);


    return this;
  }

}

export {Bpolys}
