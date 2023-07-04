import {
  EFulfillmentStatus,
  IActionFulfillmentDayStatistics,
} from "../../types/actionSummary";
import { computeStatusForDay } from "../computeStatusForDay";

describe("computeStatusForDay", () => {
  it("can return an unknown status if total is 0", () => {
    const mockStats: IActionFulfillmentDayStatistics = {
      date: "",
      total: 0,
      completedCount: 0,
      failedCount: 0,
    };

    expect(computeStatusForDay(mockStats)).toEqual(EFulfillmentStatus.Unknown);
  });

  it("can return an unknown status", () => {
    const mockStats: IActionFulfillmentDayStatistics = {
      date: "",
      total: 10,
      completedCount: 0,
      failedCount: 0,
    };

    expect(computeStatusForDay(mockStats)).toEqual(EFulfillmentStatus.Unknown);
  });

  it("can return a success status", () => {
    const mockStats: IActionFulfillmentDayStatistics = {
      date: "",
      total: 10,
      completedCount: 5,
      failedCount: 0,
    };

    expect(computeStatusForDay(mockStats)).toEqual(
      EFulfillmentStatus.Successful,
    );
  });

  it("can return a failed status", () => {
    const mockStats: IActionFulfillmentDayStatistics = {
      date: "",
      total: 10,
      completedCount: 0,
      failedCount: 10,
    };

    expect(computeStatusForDay(mockStats)).toEqual(EFulfillmentStatus.Failed);
  });

  it("can return a partial status", () => {
    const mockStats1: IActionFulfillmentDayStatistics = {
      date: "",
      total: 10,
      completedCount: 4,
      failedCount: 4,
    };

    const mockStats2: IActionFulfillmentDayStatistics = {
      date: "",
      total: 10,
      completedCount: 0,
      failedCount: 4,
    };

    const mockStats3: IActionFulfillmentDayStatistics = {
      date: "",
      total: 10,
      completedCount: 5,
      failedCount: 5,
    };

    expect(computeStatusForDay(mockStats1)).toEqual(EFulfillmentStatus.Partial);
    expect(computeStatusForDay(mockStats2)).toEqual(EFulfillmentStatus.Partial);
    expect(computeStatusForDay(mockStats3)).toEqual(EFulfillmentStatus.Partial);
  });
});
