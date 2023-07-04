import { currentUnixTimestamp } from "../helpers/currentUnixTimestamp";
import { createGuid } from "../helpers/guid";
import {
  ActionFulfillment,
  IActionFulfillment,
} from "next-shared/src/models/ActionFulfillment";

export const generateMockActionFulfillment = (
  customFulfillmentsData?: Partial<IActionFulfillment>,
) => {
  const defaultMock: IActionFulfillment = {
    actionId: `generated-action-id-${createGuid(6)}`,
    fulfillmentId: `generated-action-fulfillment-${createGuid(6)}`,
    fulfilledById: `generated-patient-id-${createGuid(6)}`,
    dueAt: currentUnixTimestamp() + 60 * 60 * 24,
    comment: "This is a generated fulfillment",
  };
  return ActionFulfillment.unserialize({
    ...defaultMock,
    ...customFulfillmentsData,
  });
};

export const generateMockActionFulfillments = (
  count: number,
  customFulfillmentsData?: Partial<IActionFulfillment>,
) => {
  return Array.from({
    length: count,
  }).map(() => generateMockActionFulfillment(customFulfillmentsData));
};
