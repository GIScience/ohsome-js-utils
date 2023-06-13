import {Response} from './Response';
import {ResponseJSON} from '../format/ResponseJSON';
import {RatioResponseJSON} from '../format/RatioResponseJSON';
import {TimestampRatioValuesJSON} from '../format/TimestampRatioValuesJSON';

class RatioResponse extends Response implements RatioResponseJSON {

  public ratioResult: TimestampRatioValuesJSON[];

  public timestamps: string[] = null;
  public ratios: number[] = null;
  public values: number[] = null;
  public values2: number[] = null;

  constructor(response: RatioResponseJSON) {
    super(response);
    this.ratioResult = response.ratioResult;
  }

  /**
   * Type-guard to check against RatioResponseJSON
   * Needs at least an empty array to be true.
   * If the result array is not empty all props of Items must be defined and non-null
   * @param response
   * @returns boolean response is RatioResponseJSON
   */
  static isRatioResponseJSON(response: ResponseJSON): response is RatioResponseJSON {
    const hasRatioResultArray = (<RatioResponseJSON>response).ratioResult instanceof Array;
    if (!hasRatioResultArray) {
      return false;
    }

    if ((<RatioResponseJSON>response).ratioResult.length === 0) {
      return true;
    } else {
      const hasTimestamps = (<RatioResponseJSON>response).ratioResult[0].timestamp != undefined;
      const hasRatio = (<RatioResponseJSON>response).ratioResult[0].ratio != undefined;
      const hasValue = (<RatioResponseJSON>response).ratioResult[0].value != undefined;
      const hasValue2 = (<RatioResponseJSON>response).ratioResult[0].value2 != undefined;
      return hasTimestamps && hasRatio && hasValue && hasValue2;
    }
  }

  getResult(): TimestampRatioValuesJSON[] {
    return this.ratioResult;
  }

  getTimestamps(): string[] {
    if (!this.timestamps) {
      this.timestamps = this.ratioResult.map((trvv2) => trvv2.timestamp);
    }
    return this.timestamps;
  }

  getRatios(): number[] {
    if (!this.ratios) {
      this.ratios = this.ratioResult.map((trvv2) => trvv2.ratio);
    }
    return this.ratios;
  }

  getValues(): number[] {
    if (!this.values) {
      this.values = this.ratioResult.map((trvv2) => trvv2.value);
    }
    return this.values;
  }

  getValues2(): number[] {
    if (!this.values2) {
      this.values2 = this.ratioResult.map((trvv2) => trvv2.value2);
    }
    return this.values2;
  }

  getRatioValueValue2At(index: number): [number, number, number] {
    const rvv2 = this.ratioResult[index];
    return [rvv2.ratio, rvv2.value, rvv2.value2];
  }

  getMaxValue(valueName: 'ratio' | 'value' | 'value2'): number {
    switch (valueName) {
      case 'ratio': {
        return Math.max(...this.getRatios());
      }
      case 'value': {
        return Math.max(...this.getValues());
      }
      case 'value2': {
        return Math.max(...this.getValues2());
      }
    }
  }

  getMinValue(valueName: 'ratio' | 'value' | 'value2'): number {
    switch (valueName) {
      case 'ratio': {
        return Math.min(...this.getRatios());
      }
      case 'value': {
        return Math.min(...this.getValues());
      }
      case 'value2': {
        return Math.min(...this.getValues2());
      }
    }
  }

  toCSV(): string {
    let csv = 'timestamp,ratio,value,value2\n';
    const length = this.getTimestamps().length;
    for (let i = 0; i < length; i++) {
      csv += this.getTimestamps()[i] + ',' + this.getRatios()[i] + ',' + this.getValues()[i] + ',' + this.getValues2()[i] + '\n';
    }
    return csv;
  }
}

export {RatioResponse};
