import { IReoccurringTimeYearDay } from "../../types/IReoccurringTime";
import { calculateNextYearDayOccurrences } from "../calculateNextOccurrences";

describe("calculateNextYearDayOccurrences", () => {
  const mockTimezones = [
    ["Australia/Brisbane", "GMT+10"],
    ["Australia/Sydney", "GMT+11"], // should test this with a from date during daylight saving
    ["Australia/Perth", "GMT+8"],
  ];

  it("should throw error if timezone is missing", () => {
    const mockYearDayDefinition: IReoccurringTimeYearDay = {
      type: "year",
      months: [1, 2, 6],
      days: [1, 15],
      timeOfDay: [
        {
          hour: 13,
          minute: 30,
        },
      ],
    };

    expect(() =>
      calculateNextYearDayOccurrences(mockYearDayDefinition, undefined),
    ).toThrowError(
      "Missing time zone information. Unable to calculate year day occurrences",
    );
  });

  it.each(mockTimezones)(
    "should generate unix timestamp relevant to the %s time zone",
    (mockTimeZone, gmtOffsetString) => {
      const fromTimestamp =
        Date.parse(`10 Oct 2022 09:30:00 ${gmtOffsetString}`) / 1000;

      const expectedTimestamps = [
        Date.parse(`1 Jan 2023 13:30:00 ${gmtOffsetString}`) / 1000,
        Date.parse(`15 Jan 2023 13:30:00 ${gmtOffsetString}`) / 1000,
        Date.parse(`1 Feb 2023 13:30:00 ${gmtOffsetString}`) / 1000,
        Date.parse(`15 Feb 2023 13:30:00 ${gmtOffsetString}`) / 1000,

        Date.parse(`1 Nov 2022 13:30:00 ${gmtOffsetString}`) / 1000, // if you're wondering... just remember that November comes after October, so it's in the same year
        Date.parse(`15 Nov 2022 13:30:00 ${gmtOffsetString}`) / 1000,
      ];

      const mockYearDayDefinition: IReoccurringTimeYearDay = {
        type: "year",
        months: [1, 2, 11], // picked the months that ARE in daylight saving on purpose.
        days: [1, 15],
        timeOfDay: [
          {
            hour: 13,
            minute: 30,
          },
        ],
      };

      const mockTimestamps = calculateNextYearDayOccurrences(
        mockYearDayDefinition,
        mockTimeZone,
        fromTimestamp,
      );

      expect(mockTimestamps).toEqual(expectedTimestamps);
    },
  );
});
