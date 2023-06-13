import {ResponseJSON} from "../format/ResponseJSON";
import {MetadataJSON} from "../format/MetadataJSON";
import {TimestampValueJSON} from '../format/TimestampValueJSON';
import {TimestampWholePartJSON} from '../format/TimestampWholePartJSON';
import {AttributionJSON} from '../format';
import {TimeIntervalValueJSON} from '../format/TimeIntervalValueJSON';
import {GroupByResultItemJSON} from '../format/GroupByResultItemJSON';
import {TimestampRatioValuesJSON} from '../format/TimestampRatioValuesJSON';

abstract class Response implements ResponseJSON {
  public apiVersion: string;
  public attribution: AttributionJSON;
  public metadata: MetadataJSON;

  constructor(protected response: ResponseJSON) {
    this.apiVersion = response.apiVersion;
    this.attribution = response.attribution;
    this.metadata = response.metadata;
  }

  abstract getResult(): TimestampValueJSON[] | TimestampWholePartJSON[] | TimeIntervalValueJSON[] | TimestampRatioValuesJSON[] | GroupByResultItemJSON[];

  abstract toCSV(): string;
}

export {Response};
