import {ResponseJSON} from './ResponseJSON';
import {GroupByBoundaryRatioResultItemJSON} from './GroupByBoundaryRatioResultItemJSON';

export interface GroupByBoundaryRatioResponseJSON extends ResponseJSON {
  groupByBoundaryResult: GroupByBoundaryRatioResultItemJSON[];
}
