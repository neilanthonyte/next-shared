import { IActionType } from "../models/Action";

/**
 * The action row type from the actions table.
 */
export interface IActionRow {
  actionId: string;
  /** ISO 8601 date string - Postgres handles this format for timestampz */
  created_at: string;
  /** ISO 8601 date string - Postgres handles this format for timestampz */
  updated_at: string;
  type: IActionType;
  title: string;
  data: string | null;
  externalSource?: string;
  externalId?: string;
  documentationSource?: string;
  documentationId?: string;
  subjectId: string;
  ownerId: string;
  authorId: string;
  /**
   * Check if it serializes
   * JSON type is treated as string in knex postgres
   */
  occurrences: string | unknown[];
  /**
   * This field is used to determine whether next set of fulfillments should be generated for this action
   */
  nextFulfillmentGeneration?: string;
  actionTemplateId?: string;
  /**
   * ISO 8601 date string - Postgres handles this format for timestampz
   * if this is set, then the action is seen as deleted. If not set, then it's not deleted.
   */
  deletedAt: string | null;
  /**
   * ISO 8601 date string - Postgres handles this format for timestampz
   *
   */
  endDate: string | null;
  /**
   * When the action is concluded.
   * ISO 8601 date string - Postgres handles this format for timestampz
   * if this is set, then the action is seen as deleted. If not set, then it's not deleted.
   */
  concludedAt: string | null;

  /**
   * Whether the action should be active. An
   * ISO 8601 date string - Postgres handles this format for timestampz
   * if this is set, then the action is seen as deleted. If not set, then it's not deleted.
   */
  activeAt: string | null;

  /**
   * The ID of the EHR from which this action originated.
   */
  ehrOfOriginId: string | null;

  latestSubjectTimezone: string | null;
}
