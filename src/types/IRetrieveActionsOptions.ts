import { IActionType } from "../models/Action";

export interface IRetrieveActionsOptions {
  /** Filter to a particular type */
  typeFilter?: IActionType;
  /** Include completed actions, e.g. view all read articles */
  includeResolved?: boolean;
  /** Only fetch specific date actions. Formatted as YYYY-MM-DD */
  date?: string;
}
