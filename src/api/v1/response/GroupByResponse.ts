import {Response} from './Response';
import {GroupByResponseJSON} from '../format/GroupByResponseJSON';
import {ResponseJSON} from '../format/ResponseJSON';
import {GroupByResultItemJSON} from '../format/GroupByResultItemJSON';
import {GroupByBoundaryRatioResponseJSON} from '../format/GroupByBoundaryRatioResponseJSON';

class GroupByResponse extends Response implements GroupByResponseJSON {

  public groupByResult: GroupByResultItemJSON[];

  constructor(response: GroupByResponseJSON | GroupByBoundaryRatioResponseJSON) {
    super(response);
    //this.groupByResult = response.groupByResult;
    //TODO remove harmonization code once api is consistent
    if (response.groupByBoundaryResult != undefined) {
      this.groupByResult = response.groupByBoundaryResult.map(groupByResultItem => {
        //rename ratioResult to result
        return {
          groupByObject: groupByResultItem.groupByObject,
          result: groupByResultItem.ratioResult
        };
      });
    } else {
      this.groupByResult = response.groupByResult;
    }
  }

  /**
   * Type-guard to check against GroupByResponseJSON or GroupByBoundaryRatioResponseJSON
   * @param response
   * @returns boolean response is GroupByResponseJSON or GroupByBoundaryRatioResponseJSON
   */
  static isGroupByResponseJSON(response: ResponseJSON): response is GroupByResponseJSON {
    const hasGroupByResult = (<GroupByResponseJSON>response).groupByResult instanceof Array || (<GroupByBoundaryRatioResponseJSON>response).groupByBoundaryResult instanceof Array;
    return hasGroupByResult;
  }

  getResult(): GroupByResultItemJSON[] {
    return this.groupByResult;
  }

  toCSV(): string {
    let csv = '';
    let resultItemProps: string[];

    //get headings from first existing groupResultItem
    outerloop:
      for (const groupByResultItem of this.groupByResult) {
        for (const resultItem of groupByResultItem.result) {
          resultItemProps = Object.getOwnPropertyNames(resultItem);
          csv = `groupByObject,${resultItemProps.join(',')}` + '\n';
          break outerloop;
        }
      }

    //get the data
    for (const groupByResultItem of this.groupByResult) {
      for (const resultItem of groupByResultItem.result) {
        csv += [groupByResultItem.groupByObject, ...resultItemProps.map(prop => resultItem[prop])].join(',') + '\n';
      }
    }

    return csv;
  }
}

export {GroupByResponse};
