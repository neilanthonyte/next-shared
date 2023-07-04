import {
  EWeekday,
  IReoccurringTimeWeekDay,
} from "../../types/IReoccurringTime";
import { calculateNextWeekDayOccurrences } from "../calculateNextOccurrences";

describe("calculateNextWeekDayOccurrences", () => {
  const mockTimezones = [
    ["Australia/Brisbane", "GMT+10"],
    ["Australia/Sydney", "GMT+11"], // should test this with a from date during daylight saving
    ["Australia/Perth", "GMT+8"],
  ];

  it("should throw error if timezone is missing", () => {
    const mockTimeWeekDayDefinition: IReoccurringTimeWeekDay = {
      type: "week",
      weekdays: [EWeekday.Monday, EWeekday.Tuesday],
      timeOfDay: [
        {
          hour: 9,
          minute: 30,
        },
      ],
    };

    expect(() =>
      calculateNextWeekDayOccurrences(mockTimeWeekDayDefinition, undefined),
    ).toThrowError(
      "Missing time zone information. Unable to calculate week day occurrences",
    );
  });

  it.each(mockTimezones)(
    "should generate unix timestamp relevant to the %s time zone",
    (mockTimeZone, gmtOffsetString) => {
      const fromTimestamp =
        Date.parse(`10 Oct 2022 10:30:00 ${gmtOffsetString}`) / 1000; // it's a Monday.

      const expectedTimestamp =
        Date.parse(`11 Oct 2022 10:30:00 ${gmtOffsetString}`) / 1000; // it's a Tuesday

      const mockOccurrence: IReoccurringTimeWeekDay = {
        type: "week",
        weekdays: [EWeekday.Tuesday],
        timeOfDay: [
          {
            hour: 10,
            minute: 30,
          },
        ],
      };

      const [occurrenceTimestamp] = calculateNextWeekDayOccurrences(
        mockOccurrence,
        mockTimeZone,
        fromTimestamp,
      );

      expect(occurrenceTimestamp).toEqual(expectedTimestamp);
    },
  );
});
