import moment from "moment-timezone";
import { Action } from "../models/Action";
import { calculateNextOccurrences } from "./calculateNextOccurrences";

/**
 * Filter an array of actions to only ones with
 * occurrences that may occur on the given date (entire day)
 * @param actions - source actions to filter
 * @param date - Date string in YYYY-MM-DD format.
 * @return - Filtered actions
 */
export const filterActionsByDate = (
  actions: Action[],
  date: string,
): Action[] => {
  const actionsOnTheDay = actions
    .filter((action) => {
      if (!action.activeAt) {
        return false;
      }

      const momentDay = moment.tz(date, action.latestSubjectTimezone);

      if (!momentDay.isValid()) {
        throw new Error("unknown date format");
      }

      // TODO: Revise storage of occurrences and datetime comparisons to be somehow agnostic of timezone
      const startOfDayTimestamp = momentDay.unix();

      if (
        moment
          .unix(action.activeAt)
          .tz(action.latestSubjectTimezone)
          .isAfter(momentDay, "day")
      ) {
        return false;
      }
      const occurrences = calculateNextOccurrences(
        action.occurrences,
        action.latestSubjectTimezone,
        startOfDayTimestamp,
      );
      // using Sydney as the TZ to be consistent with next occurrences calculation
      const actionOccurrencesMatchingDayDue = occurrences.filter((occurrence) =>
        moment
          .unix(occurrence)
          .tz(action.latestSubjectTimezone)
          .isSame(momentDay, "day"),
      );

      return actionOccurrencesMatchingDayDue.length > 0;
    })
    // generate next fulfillments to ensure every actions queried has fulfillments
    .map((action) => {
      const momentDay = moment.tz(date, action.latestSubjectTimezone);

      if (!momentDay.isValid()) {
        throw new Error("unknown date format");
      }

      // TODO: Revise storage of occurrences and datetime comparisons to be somehow agnostic of timezone
      const startOfDayTimestamp = momentDay.unix();

      const generatedFulfillments =
        action.generateNextFulfillments(startOfDayTimestamp);
      // filter current fulfillments by the passed in date.
      const filteredAction = action.fulfillments.filter((fulfillment) => {
        return moment
          .unix(fulfillment.dueAt)
          .tz(action.latestSubjectTimezone)
          .isSame(momentDay, "day");
      });

      const mergedFulfillments = generatedFulfillments.reduce(
        (mergedFulfillments, virtualFulfillment) => {
          // check whether the fulfillment already exists in the actions. This way if it has any existing resolution,
          // it'll come through.
          const existingFulfillment = action.fulfillments.find(
            (realFulfillment) =>
              realFulfillment.fulfillmentId === virtualFulfillment.uniqueId(),
          );

          return [
            ...mergedFulfillments,
            existingFulfillment ?? virtualFulfillment,
          ];
        },
        filteredAction,
      );

      action.fulfillments = mergedFulfillments;
      return action;
    });

  return actionsOnTheDay;
};
