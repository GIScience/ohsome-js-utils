abstract class Boundary {
  private _id: string;
  private _geometry: string;

  abstract parse(value: string): void;

  public toString() {
    if (this.id != null && this.id !== '') {
      return this.id + ':' + this.geometry;
    } else {
      return this.geometry;
    }
  }

  get id(): string {
    return this._id;
  }

  set id(value: string) {
    this._id = value;
  }

  get geometry(): string {
    return this._geometry;
  }

  set geometry(value: string) {
    this._geometry = value;
  }
}

export {Boundary};
