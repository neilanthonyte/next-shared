import {
  IActionFulfillmentDayStatistics,
  EFulfillmentStatus,
} from "../types/actionSummary";

/**
 * (In order)
 * - Unknown: 0 fulfillments
 * - Good: 0 bad fulfillments
 * - Bad: 0 good fulfillments
 * - Mixed: ~else~
 */
export const computeStatusForDay = (
  statistics?: IActionFulfillmentDayStatistics,
): EFulfillmentStatus => {
  // total: 0
  if (!statistics || statistics.total === 0) {
    return EFulfillmentStatus.Unknown;
  }
  // If no unresolved stats
  if (statistics.failedCount === 0) {
    if (statistics.completedCount === 0) {
      // i.e. F = 0, S = 0, Total = 10
      return EFulfillmentStatus.Unknown;
    } else {
      // i.e. F = 0, S != 0, Total = 10
      return EFulfillmentStatus.Successful;
    }
  }

  if (
    statistics.completedCount === 0 &&
    statistics.failedCount === statistics.total
  ) {
    // i.e. F = 10, S = 0, T = 10
    return EFulfillmentStatus.Failed;
  }
  // i.e. F = 5, S = 5, T = 10
  // i.e. F = 4, S = 4, T = 10
  return EFulfillmentStatus.Partial;
};
