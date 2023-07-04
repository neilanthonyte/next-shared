import { IReoccurringTimeMonthDay } from "../../types/IReoccurringTime";
import { calculateNextMonthDayOccurrences } from "../calculateNextOccurrences";

describe("calculateNextMonthDayOccurrences", () => {
  const mockTimezones = [
    ["Australia/Brisbane", "GMT+10"],
    ["Australia/Sydney", "GMT+11"], // should test this with a from date during daylight saving
    ["Australia/Perth", "GMT+8"],
  ];

  it("should throw error if timezone is missing", () => {
    const mockMonthDayDefinition: IReoccurringTimeMonthDay = {
      type: "month",
      days: [1, 2],
      timeOfDay: [
        {
          hour: 13,
          minute: 30,
        },
      ],
    };

    expect(() =>
      calculateNextMonthDayOccurrences(mockMonthDayDefinition, undefined),
    ).toThrowError(
      "Missing time zone information. Unable to calculate month day occurrences",
    );
  });

  it.each(mockTimezones)(
    "should generate unix timestamp relevant to the %s time zone",
    (mockTimeZone, gmtOffsetString) => {
      const fromTimestamp =
        Date.parse(`10 Oct 2022 09:30:00 ${gmtOffsetString}`) / 1000;

      const utcTimestamp = Date.parse(`1 Nov 2022 13:30:00 GMT`) / 1000;

      const expectedTimestamp1 =
        Date.parse(`1 Nov 2022 13:30:00 ${gmtOffsetString}`) / 1000;

      const expectedTimestamp2 =
        Date.parse(`2 Nov 2022 13:30:00 ${gmtOffsetString}`) / 1000;

      const mockMonthDayDefinition: IReoccurringTimeMonthDay = {
        type: "month",
        days: [1, 2],
        timeOfDay: [
          {
            hour: 13,
            minute: 30,
          },
        ],
      };

      const [mockTimestamp1, mockTimestamp2] = calculateNextMonthDayOccurrences(
        mockMonthDayDefinition,
        mockTimeZone,
        fromTimestamp,
      );

      expect(mockTimestamp1).toEqual(expectedTimestamp1);
      expect(mockTimestamp2).toEqual(expectedTimestamp2);
      expect(mockTimestamp1).not.toEqual(utcTimestamp);
      expect(mockTimestamp2).not.toEqual(utcTimestamp);
    },
  );
});
