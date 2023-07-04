import { Action } from "../models/Action";

/**
 * helper function removing fulfillments with status ActionUpdated (3) from provided actions
 */
export const filterActionUpdatedFulfillments = (
  actions: Action[],
): Action[] => {
  return actions.map((a) => {
    a.fulfillments = a.fulfillments.filter((af) => af.resolution !== 3);
    return a;
  });
};
