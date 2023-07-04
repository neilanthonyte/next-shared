import moment from "moment-timezone";
import { TActionOccurrence } from "../types/TActionOccurrence";
import { arrayToText } from "./arrayToText";
import { daysToText } from "./daysToText";

export const occurrencesToText = (occurrences: TActionOccurrence[]) => {
  if (!occurrences) {
    console.warn("occurrencesToText passed falsy value");
    return "No due time set";
  }
  const dueTimes = occurrences.map((occurance) => {
    switch (occurance.type) {
      case "single":
        return `${moment.unix(occurance.time).format("MMM Do YYYY")}`;
      case "week":
        const weekdays = daysToText(occurance.weekdays);
        const times = arrayToText(
          (occurance.timeOfDay || []).map((t) => moment(t).format("h:mmA")),
        );
        return times ? `${weekdays} at ${times}` : weekdays;
      default:
        return "Unknown frequency";
    }
  });
  return `Due ${arrayToText(dueTimes)}`;
};
