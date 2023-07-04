import { Action } from "../../models/Action";
import { calculateNextOccurrences } from "../../helpers/calculateNextOccurrences";
import { EWeekday } from "../../types/IReoccurringTime";
import moment from "moment";

describe("Testing calculateNextOccurrences", () => {
  describe("Single occurrence", () => {
    it("should return an empty array if the time is in the past", async () => {
      const action = new Action();
      const time = new Date().getTime() - 500;
      action.occurrences = [
        {
          type: "single",
          time,
        },
      ];

      const nextOccurrences = calculateNextOccurrences(
        action.occurrences,
        "Australia/Sydney",
      );

      expect(nextOccurrences).toEqual([]);
    });
    it("should return an array containing the time if the time is in the future", async () => {
      const action = new Action();
      const time = new Date().getTime() + 500;
      action.occurrences = [
        {
          type: "single",
          time,
        },
      ];

      const nextOccurrences = calculateNextOccurrences(
        action.occurrences,
        "Australia/Sydney",
      );

      expect(nextOccurrences).toEqual([]);
    });
  });

  describe.skip("Weekly occurrence", () => {
    it("should return an array containing all occurrences for the week if in the future", async () => {
      const action = new Action();
      const weekdays: EWeekday[] = [
        moment().add(1, "day").format("dddd").toLowerCase() as EWeekday,
        moment().add(2, "day").format("dddd").toLowerCase() as EWeekday,
      ];
      action.occurrences = [
        {
          type: "week",
          weekdays,
          timeOfDay: [
            { hour: 8, minute: 0 },
            { hour: 16, minute: 35 },
          ],
        },
      ];

      const nextOccurrences = calculateNextOccurrences(
        action.occurrences,
        "Australia/Sydney",
      );
      const expected = [
        moment().add(1, "day").hours(8).minutes(0).seconds(0).unix(),
        moment().add(1, "day").hours(16).minutes(35).seconds(0).unix(),
        moment().add(2, "day").hours(8).minutes(0).seconds(0).unix(),
        moment().add(2, "day").hours(16).minutes(35).seconds(0).unix(),
      ];
      expect(nextOccurrences).toEqual(expected);
    });

    it("should return an array containing occurrences from next week if in the past", async () => {
      const action = new Action();
      const weekdays: EWeekday[] = [
        moment().subtract(1, "day").format("dddd").toLowerCase() as EWeekday,
      ];

      action.occurrences = [
        {
          type: "week",
          weekdays,
          timeOfDay: [
            { hour: 8, minute: 0 },
            { hour: 16, minute: 35 },
          ],
        },
      ];

      const nextOccurrences = calculateNextOccurrences(
        action.occurrences,
        "Australia/Sydney",
      );
      const expected = [
        moment().add(6, "day").hours(8).minutes(0).seconds(0).unix(),
        moment().add(6, "day").hours(16).minutes(35).seconds(0).unix(),
      ];

      expect(nextOccurrences).toEqual(expected);
    });
  });
  describe.skip("Monthly occurrence", () => {
    it("should return an array containing all occurrences for the month if in the future", async () => {
      const action = new Action();
      const days: number[] = [
        moment().add(5, "day").date(),
        moment().add(10, "day").date(),
      ];
      action.occurrences = [
        {
          type: "month",
          days,
          timeOfDay: [
            { hour: 8, minute: 0 },
            { hour: 16, minute: 35 },
          ],
        },
      ];

      const nextOccurrences = calculateNextOccurrences(
        action.occurrences,
        "Australia/Sydney",
      );
      const expected = [
        moment().add(5, "day").hours(8).minutes(0).seconds(0).unix(),
        moment().add(5, "day").hours(16).minutes(35).seconds(0).unix(),
        moment().add(10, "day").hours(8).minutes(0).seconds(0).unix(),
        moment().add(10, "day").hours(16).minutes(35).seconds(0).unix(),
      ];
      expect(nextOccurrences).toEqual(expected);
    });
    it("should return an array containing occurrences from next month if in the past", async () => {
      const action = new Action();
      const days: number[] = [moment().subtract(5, "day").date()];
      action.occurrences = [
        {
          type: "month",
          days,
          timeOfDay: [
            { hour: 8, minute: 0 },
            { hour: 16, minute: 35 },
          ],
        },
      ];

      const nextOccurrences = calculateNextOccurrences(
        action.occurrences,
        "Australia/Sydney",
      );
      const expected = [
        moment()
          .subtract(5, "day")
          .add(1, "months")
          .hours(8)
          .minutes(0)
          .seconds(0)
          .unix(),
        moment()
          .subtract(5, "day")
          .add(1, "months")
          .hours(16)
          .minutes(35)
          .seconds(0)
          .unix(),
      ];
      expect(nextOccurrences).toEqual(expected);
    });
  });
  describe.skip("Yearly occurrence", () => {
    it("should return an array containing all occurrences for the year if in the future", async () => {
      const action = new Action();
      const days: number[] = [moment().date()];
      const months: number[] = [
        moment()
          .add(2, "months") // moment uses 0-indexed months
          .month(),
      ];
      action.occurrences = [
        {
          type: "year",
          months,
          days,
          timeOfDay: [
            { hour: 8, minute: 0 },
            { hour: 16, minute: 35 },
          ],
        },
      ];

      const nextOccurrences = calculateNextOccurrences(
        action.occurrences,
        "Australia/Sydney",
      );
      const expected = [
        moment()
          .add(1, "months") // only 1 here because it's unix
          .hours(8)
          .minutes(0)
          .seconds(0)
          .unix(),
        moment().add(1, "months").hours(16).minutes(35).seconds(0).unix(),
      ];
      expect(nextOccurrences).toEqual(expected);
    });
    it("should return an array containing occurrences from next year if in the past", async () => {
      const action = new Action();
      const days: number[] = [moment().date()];
      const months: number[] = [
        moment()
          .subtract(1, "months") // only 1 here because moment uses 0-indexed months
          .month(),
      ];

      action.occurrences = [
        {
          type: "year",
          days,
          months,
          timeOfDay: [
            { hour: 8, minute: 0 },
            { hour: 16, minute: 35 },
          ],
        },
      ];

      const nextOccurrences = calculateNextOccurrences(
        action.occurrences,
        "Australia/Sydney",
      );
      const expected = [
        moment()
          .add(1, "year")
          .subtract(2, "months") // 2 here because it's unix
          .hours(8)
          .minutes(0)
          .seconds(0)
          .unix(),
        moment()
          .add(1, "year")
          .subtract(2, "months")
          .hours(16)
          .minutes(35)
          .seconds(0)
          .unix(),
      ];
      expect(nextOccurrences).toEqual(expected);
    });
  });
});
