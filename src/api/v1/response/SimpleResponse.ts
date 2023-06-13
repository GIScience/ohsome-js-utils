import {Response} from "./Response";
import {SimpleResponseJSON} from "../format/SimpleResponseJSON";
import {TimestampValueJSON} from "../format/TimestampValueJSON";
import {ResponseJSON} from '../format/ResponseJSON';

class SimpleResponse extends Response implements SimpleResponseJSON {

  public result: TimestampValueJSON[];

  public timestamps: string[] = null;
  public values: number[] = null;

  constructor(protected response: SimpleResponseJSON) {
    super(response);
    this.result = response.result;
  }

  /**
   * Type-guard to check against SimpleResponseJSON
   * @param response
   * @returns boolean
   */
  static isSimpleResponseJSON(response: ResponseJSON): response is SimpleResponseJSON {
    const isSimple = (<SimpleResponseJSON>response).result instanceof Array;
    if (!isSimple) return false;
    const hasTimestamps = (<SimpleResponseJSON>response).result[0].timestamp !== undefined;
    return hasTimestamps;
  }

  getResult(){
    return this.result;
  }

  getTimestamps(): string[] {
    if (!this.timestamps) {
      this.timestamps = this.result.map((tv) => tv.timestamp);
    }
    return this.timestamps;
  }

  getValues(): number[] {
    if (!this.values) {
      this.values = this.result.map((tv) => tv.value);
    }
    return this.values;
  }

  getMaxValue(): number {
    return Math.max(...this.getValues());
  }

  getMinValue(): number {
    return Math.min(...this.getValues());
  }

  toCSV(): string {
    let csv = "timestamp,value\n";
    const length = this.getTimestamps().length;
    for (let i=0; i<length;i++) {
      csv +=  this.getTimestamps()[i] + ',' + this.getValues()[i] + '\n'
    }
    return csv;
  }

}

export {SimpleResponse}
