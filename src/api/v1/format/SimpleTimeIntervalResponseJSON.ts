import {ResponseJSON} from './ResponseJSON';
import {TimeIntervalValueJSON} from './TimeIntervalValueJSON';

export interface SimpleTimeIntervalResponseJSON extends ResponseJSON {
    result: TimeIntervalValueJSON[]
}
