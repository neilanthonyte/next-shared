import { OpsAction } from "../models/OpsAction";
import { IActionMetricsSerialized } from "./IActionMetricsSerialized";

export interface IOpsActionsWithMetrics {
  actions: OpsAction[];
  actionMetrics: IActionMetricsSerialized;
}

export type TOpsActionStatus = "active" | "inactive";
