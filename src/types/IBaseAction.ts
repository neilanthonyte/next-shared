import { unixTimestamp } from "./dateTypes";

export const ActionResolutions = [
  // TODO: review whether this is still valid
  "success",
  // TODO: review whether this is still valid
  "fail",
  // Action has concluded and is no longer active
  "concluded",
  // Action is still active, with unresolved fulfillments.
  "active",
  "inactive",
] as const;
export type TActionResolution = typeof ActionResolutions[number];

export interface IBaseAction {
  /** Could represent the created at date or last update */
  keyDate?: unixTimestamp;
  /** When was this actioned? */
  resolvedAt?: unixTimestamp;
  resolution?: TActionResolution;
  disabled?: boolean;
  title: string;
  description?: string;
  comment?: string;
  icon?: string;
}
