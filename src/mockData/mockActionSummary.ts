import { EFulfillmentStatus } from "../types/actionSummary";

/** @deprecated - should remove soon and use generateMockActionSummary instead */
export const mockSummary = {
  "2021-12-06": {
    status: EFulfillmentStatus.Partial,
    totalTasks: 5,
    totalSuccess: 3,
  },
  "2021-12-07": {
    status: EFulfillmentStatus.Successful,
    totalTasks: 1,
    totalSuccess: 1,
  },
  "2021-12-08": {
    status: EFulfillmentStatus.Successful,
    totalTasks: 2,
    totalSuccess: 2,
  },
  "2021-12-09": {
    status: EFulfillmentStatus.Failed,
    totalTasks: 3,
    totalSuccess: 0,
  },
  "2021-12-10": {
    status: EFulfillmentStatus.Successful,
    totalTasks: 2,
    totalSuccess: 2,
  },
  "2021-12-11": {
    status: EFulfillmentStatus.Successful,
    totalTasks: 0,
    totalSuccess: 0,
  },
  "2021-12-12": {
    status: EFulfillmentStatus.Failed,
    totalTasks: 2,
    totalSuccess: 2,
  },
};
