import {TimestampValueJSON} from './TimestampValueJSON';
import {TimeIntervalValueJSON} from './TimeIntervalValueJSON';
import {TimestampRatioValuesJSON} from './TimestampRatioValuesJSON';

export interface GroupByResultItemJSON {
  groupByObject: string;
  result: TimestampValueJSON[] | TimeIntervalValueJSON[] | TimestampRatioValuesJSON[]
}
