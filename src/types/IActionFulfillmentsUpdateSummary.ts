import { Action } from "../models/Action";
import { ActionFulfillment } from "../models/ActionFulfillment";

export interface IActionFulfillmentsUpdateSummary {
  action: Action;
  updatedFulfillment: ActionFulfillment;
}
