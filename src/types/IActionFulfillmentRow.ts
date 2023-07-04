import { EActionFulfillmentResolution } from "../models/ActionFulfillment";

/**
 * This entity type that PostgreS DB expects
 */
export interface IActionFulfillmentRow {
  actionFulfillmentId: string;
  actionId: string;
  fulfilledById: string;
  /** ISO 8601 date string - Postgres handles this format for timestampz */
  resolvedAt: string | null;
  resolution: EActionFulfillmentResolution;
  comment: string;
  /** ISO 8601 date string - Postgres handles this format for timestampz */
  deletedAt: string | null;
  updated_at: string;
  created_at: string;
  /**
   * ISO 8601 date string - Postgres handles this format for timestampz
   */
  dueAt?: string | null;
}
