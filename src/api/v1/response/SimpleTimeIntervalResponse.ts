import {Response} from './Response';
import {ResponseJSON} from '../format/ResponseJSON';
import {SimpleTimeIntervalResponseJSON} from '../format/SimpleTimeIntervalResponseJSON';
import {TimeIntervalValueJSON} from '../format/TimeIntervalValueJSON';

class SimpleTimeIntervalResponse extends Response implements SimpleTimeIntervalResponseJSON {

  public result: TimeIntervalValueJSON[];

  public fromTimestamps: string[] = null;
  public toTimestamps: string[] = null;
  public values: number[] = null;

  constructor(protected response: SimpleTimeIntervalResponseJSON) {
    super(response);
    this.result = response.result;
  }

  /**
   * Type-guard to check against SimpleTimeIntervalResponseJSON
   * @param response
   * @returns boolean
   */
  static isSimpleTimeIntervalResponseJSON(response: ResponseJSON): response is SimpleTimeIntervalResponseJSON {
    const isSimple = (<SimpleTimeIntervalResponseJSON>response).result !== undefined;
    if (!isSimple) return false;
    const hasFromTimestamps = (<SimpleTimeIntervalResponseJSON>response).result[0].fromTimestamp !== undefined;
    const hasToTimestamps = (<SimpleTimeIntervalResponseJSON>response).result[0].toTimestamp !== undefined;
    return hasFromTimestamps && hasToTimestamps;
  }

  getResult(){
    return this.result;
  }

  getFromTimestamps(): string[] {
    if (!this.fromTimestamps) {
      this.fromTimestamps = this.result.map((tv) => tv.fromTimestamp);
    }
    return this.fromTimestamps;
  }

  getToTimestamps(): string[] {
    if (!this.toTimestamps) {
      this.toTimestamps = this.result.map((tv) => tv.toTimestamp);
    }
    return this.toTimestamps;
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
    let csv = "from_timestamp,to_timestamp,value\n";
    const length = this.getFromTimestamps().length;
    for (let i=0; i<length;i++) {
      csv +=  this.getFromTimestamps()[i] + ',' + this.getToTimestamps()[i] + ',' + this.getValues()[i] + '\n'
    }
    return csv;
  }
}

export {SimpleTimeIntervalResponse}
