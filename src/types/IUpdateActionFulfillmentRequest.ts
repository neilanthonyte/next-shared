import { ActionFulfillment } from "../models/ActionFulfillment";
import { IUpdateActionFulfillmentOptions } from "./IUpdateActionFulfillmentOptions";

export interface IUpdateActionFulfillmentRequest {
  actionFulfillment: ActionFulfillment;
  options: IUpdateActionFulfillmentOptions;
}
