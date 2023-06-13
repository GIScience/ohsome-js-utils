import {AttributionJSON, MetadataResponseJSON, TimeIntervalJSON} from '../format';
import * as moment_ from 'moment';
const moment = moment_;

class MetadataResponse implements MetadataResponseJSON {

  public apiVersion: string;
  public attribution: AttributionJSON;
  public extractRegion: { spatialExtent: any; temporalExtent: TimeIntervalJSON };

  constructor(response: MetadataResponseJSON){
    this.apiVersion = response.apiVersion;
    this.attribution = response.attribution;
    this.extractRegion = response.extractRegion;
  }

  /**
   * Type-guard to check against MetadataResponseJSON
   * @param response
   * @returns boolean response is MetadataResponseJSON
   */
  static isMetadataResponseJSON(response: MetadataResponseJSON): response is MetadataResponseJSON {
    const hasApiVersion = (<MetadataResponseJSON>response).apiVersion !== undefined;
    if (!hasApiVersion) return false;
    const hasAttribution = (<MetadataResponseJSON>response).attribution !== undefined;
    if (!hasAttribution) return false;
    const hasExtractRegion = (<MetadataResponseJSON>response).extractRegion !== undefined;
    return hasExtractRegion;
  }

  /**
   * checks whether the metadata response contained valid date / datetime strings in it's temporal extent properties
   */
  public hasTemporalExtent(): boolean {
    return this.extractRegion &&
      this.extractRegion.temporalExtent &&
      moment(this.extractRegion.temporalExtent.fromTimestamp,moment.ISO_8601,true).isValid() &&
      moment(this.extractRegion.temporalExtent.toTimestamp,moment.ISO_8601,true).isValid();
  }

  /**
   * checks whether the metadata response contained a geoJSON geometry as spatialExtent
   */
  public hasSpatialExtent(): boolean {

    return this.extractRegion &&
      this.extractRegion.spatialExtent &&
      (
      this.extractRegion.spatialExtent.type == "Polygon" ||
      this.extractRegion.spatialExtent.type == "Multipolygon"
      );

  }

}

export {MetadataResponse}
