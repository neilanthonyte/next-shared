import moment from "moment";

import { Action } from "../Action";
import { EWeekday } from "../../types/IReoccurringTime";
import { currentUnixTimestamp } from "../../helpers/currentUnixTimestamp";

describe("Testing Action class methods", () => {
  it("is currently not being tested", () => {
    expect(true).toBeTruthy();
  });
  describe.skip("Testing getOccurrencesOnDay", () => {
    // it("should return the action occurrences only for the given day", async () => {
    //   const action = new Action();
    //   action.createdAt = currentUnixTimestamp();
    //   const weekdays: EWeekday[] = [
    //     moment().add(1, "day").format("dddd").toLowerCase() as EWeekday,
    //     moment().add(2, "day").format("dddd").toLowerCase() as EWeekday,
    //   ];
    //   action.occurrences = [
    //     {
    //       type: "week",
    //       weekdays,
    //       timeOfDay: [
    //         { hour: 8, minute: 0 },
    //         { hour: 16, minute: 35 },
    //       ],
    //     },
    //   ];
    //   const dayOccurrences = action.getOccurrencesOnDay(
    //     moment().add(1, "day").format("YYYY-MM-DD"),
    //   );
    //   const expected = [
    //     moment().add(1, "day").hours(8).minutes(0).seconds(0).unix(),
    //     moment().add(1, "day").hours(16).minutes(35).seconds(0).unix(),
    //   ];
    //   expect(dayOccurrences).toEqual(expected);
    // });
    // it("should discard occurrences on the day if occurring before time of action creation", async () => {
    //   const action = new Action();
    //   action.createdAt = currentUnixTimestamp();
    //   const weekdays: EWeekday[] = [
    //     moment().format("dddd").toLowerCase() as EWeekday,
    //   ];
    //   const now = moment();
    //   const beforeNow = now.clone().subtract(1, "minutes");
    //   const afterNow = now.clone().add(1, "minutes");
    //   action.occurrences = [
    //     {
    //       type: "week",
    //       weekdays,
    //       timeOfDay: [
    //         { hour: beforeNow.hours(), minute: beforeNow.minutes() },
    //         { hour: afterNow.hours(), minute: afterNow.minutes() },
    //       ],
    //     },
    //   ];
    //   const dayOccurrences = action.getOccurrencesOnDay(
    //     moment().format("YYYY-MM-DD"),
    //   );
    //   const expected = [
    //     moment()
    //       .hours(afterNow.hours())
    //       .minutes(afterNow.minutes())
    //       .seconds(0)
    //       .unix(),
    //   ];
    //   expect(dayOccurrences).toEqual(expected);
    // });
    // it("should return the expected occurrences if the action has mixed type entries", async () => {
    //   const action = new Action();
    //   action.createdAt = currentUnixTimestamp();
    //   const daysOfWeek: EWeekday[] = [
    //     moment().add(5, "day").format("dddd").toLowerCase() as EWeekday,
    //     moment().add(2, "day").format("dddd").toLowerCase() as EWeekday,
    //   ];
    //   const daysOfMonth: number[] = [
    //     moment().add(5, "day").date(),
    //     moment().add(10, "day").date(),
    //   ];
    //   const time = moment()
    //     .add(5, "days")
    //     .hours(11)
    //     .minutes(0)
    //     .seconds(0)
    //     .unix();
    //   action.occurrences = [
    //     {
    //       type: "week",
    //       weekdays: daysOfWeek,
    //       timeOfDay: [
    //         { hour: 8, minute: 0 },
    //         { hour: 16, minute: 0 },
    //       ],
    //     },
    //     {
    //       type: "single",
    //       time,
    //     },
    //     {
    //       type: "month",
    //       days: daysOfMonth,
    //       timeOfDay: [{ hour: 10, minute: 0 }],
    //     },
    //   ];
    //   const dayOccurrences = action.getOccurrencesOnDay(
    //     moment().add(5, "day").format("YYYY-MM-DD"),
    //   );
    //   const expected = [
    //     moment().add(5, "day").hours(8).minutes(0).seconds(0).unix(),
    //     moment().add(5, "days").hours(11).minutes(0).seconds(0).unix(),
    //     moment().add(5, "day").hours(16).minutes(0).seconds(0).unix(),
    //     moment().add(5, "day").hours(10).minutes(0).seconds(0).unix(),
    //   ];
    //   // cannot guarantee the order? used different times to make sure uniqueness
    //   dayOccurrences.map((occ) => {
    //     expect(expected).toContain(occ);
    //   });
    //   expect(dayOccurrences.length).toBe(4);
    // });
    // it("should return repeated occurrences happening at the exact same time", async () => {
    //   const action = new Action();
    //   action.createdAt = currentUnixTimestamp();
    //   const daysOfWeek: EWeekday[] = [
    //     moment().add(5, "day").format("dddd").toLowerCase() as EWeekday,
    //   ];
    //   const time = moment()
    //     .add(5, "days")
    //     .hours(8)
    //     .minutes(0)
    //     .seconds(0)
    //     .unix();
    //   action.occurrences = [
    //     {
    //       type: "week",
    //       weekdays: daysOfWeek,
    //       timeOfDay: [{ hour: 8, minute: 0 }],
    //     },
    //     {
    //       type: "single",
    //       time,
    //     },
    //   ];
    //   const dayOccurrences = action.getOccurrencesOnDay(
    //     moment().add(5, "day").format("YYYY-MM-DD"),
    //   );
    //   const expected = [
    //     moment().add(5, "day").hours(8).minutes(0).seconds(0).unix(),
    //     moment().add(5, "days").hours(8).minutes(0).seconds(0).unix(),
    //   ];
    //   // cannot guarantee the order? used different times to make sure uniqueness
    //   dayOccurrences.map((occ) => {
    //     expect(expected).toContain(occ);
    //   });
    //   expect(dayOccurrences.length).toBe(2);
    // });
    // it("should return an empty array if no occurrences set", async () => {
    //   const action = new Action();
    //   action.createdAt = currentUnixTimestamp();
    //   const dayOccurrences = action.getOccurrencesOnDay(
    //     moment().add(5, "day").format("YYYY-MM-DD"),
    //   );
    //   expect(dayOccurrences).toEqual([]);
    // });
  });

  describe.skip("getOccurrencesBetween", () => {
    //   it.only("Should return occurrences across multiple weeks, with a mixture of input types", () => {
    //     const baseTime = 1569981600;
    //     const oneDay = 60 * 60 * 24;
    //     const action = new Action();
    //     action.createdAt = baseTime;
    //     action.occurrences = [
    //       {
    //         type: "single",
    //         time: baseTime + oneDay,
    //       },
    //       {
    //         // 14 days * 2
    //         type: "week",
    //         weekdays: [EWeekday.Wednesday, EWeekday.Thursday, EWeekday.Friday],
    //         timeOfDay: [
    //           { hour: 9, minute: 0 },
    //           { hour: 13, minute: 0 },
    //         ],
    //       },
    //       {
    //         type: "month",
    //         days: [28, 29],
    //         timeOfDay: [{ hour: 10, minute: 30 }],
    //       },
    //     ];
    //     const res = action.getOccurrencesBetween(
    //       baseTime,
    //       baseTime + oneDay * 30,
    //     );
    //     expect(res.length).toEqual(1 + 28 + 2);
    //   });
  });
});
