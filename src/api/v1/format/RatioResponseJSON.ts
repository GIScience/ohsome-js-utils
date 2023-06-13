import {ResponseJSON} from './ResponseJSON';
import {TimestampRatioValuesJSON} from './TimestampRatioValuesJSON';

export interface RatioResponseJSON extends ResponseJSON {
    ratioResult: TimestampRatioValuesJSON[];
}
