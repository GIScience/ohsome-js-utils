import {MetadataJSON} from './MetadataJSON';
import {TimestampValueJSON} from './TimestampValueJSON';
import {AttributionJSON} from './AttributionJSON';
import {TimeIntervalValueJSON} from './TimeIntervalValueJSON';
import {GroupByResultItemJSON} from './GroupByResultItemJSON';
import {TimestampRatioValuesJSON} from './TimestampRatioValuesJSON';
import {GroupByBoundaryRatioResultItemJSON} from './GroupByBoundaryRatioResultItemJSON';

export interface ResponseJSON {
  apiVersion: string;
  attribution: AttributionJSON;
  metadata?: MetadataJSON;
  result?: TimestampValueJSON[] | TimeIntervalValueJSON[];
  // TODO add other resulttypes
  ratioResult?: TimestampRatioValuesJSON[];
  groupByResult?: GroupByResultItemJSON[];
  // TODO currently inconsistent response structure when using ratio/groupByBoundary -> should work like "normal" groupByResult in the future
  groupByBoundaryResult?: GroupByBoundaryRatioResultItemJSON[];
}
