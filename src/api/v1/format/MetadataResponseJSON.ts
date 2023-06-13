import {TimeIntervalJSON} from './TimeIntervalJSON';
import {ResponseJSON} from './ResponseJSON';

export interface MetadataResponseJSON extends ResponseJSON{
  extractRegion: {
    spatialExtent: any;
    temporalExtent: TimeIntervalJSON;
  }
  }
