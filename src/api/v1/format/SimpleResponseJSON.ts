import {ResponseJSON} from "./ResponseJSON";
import {TimestampValueJSON} from "./TimestampValueJSON";

export interface SimpleResponseJSON extends ResponseJSON {
    result: TimestampValueJSON[]
}
