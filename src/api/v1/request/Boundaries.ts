import {Boundary} from './Boundary';

abstract class Boundaries {

  abstract boundaries: Boundary[];

  abstract parse(value: string): Boundaries;

  toParamValue(): string {
    return this.boundaries.map(boundary => boundary.toString()).join('|');
  }

  toArray(): Boundary[] {
    return this.boundaries;
  }

}

export {Boundaries};
