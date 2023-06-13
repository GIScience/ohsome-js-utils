import {ResponseJSON} from "./ResponseJSON";
import {GroupByResultItemJSON} from './GroupByResultItemJSON';

export interface GroupByResponseJSON extends ResponseJSON {
    groupByResult: GroupByResultItemJSON[];
}
