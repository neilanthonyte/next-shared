import { TimeOfDay } from "../TimeOfDay";

describe("TimeOfDay.splitTime", () => {
  const items = [
    {
      input: "OPENING + 60",
      expected: ["OPENING", "+", "60"],
    },
    {
      input: "OPENING - 60",
      expected: ["OPENING", "-", "60"],
    },
    {
      input: "OPENING + 60   ",
      expected: ["OPENING", "+", "60"],
    },
    {
      input: "   OPENING + 60",
      expected: ["OPENING", "+", "60"],
    },
    {
      input: " OPENING +60",
      expected: ["OPENING", "+", "60"],
    },
    {
      input: "OPENING-30",
      expected: ["OPENING", "-", "30"],
    },
    {
      input: "OPENING",
      expected: ["OPENING", undefined, undefined],
    },
    {
      input: "CLOSING",
      expected: ["CLOSING", undefined, undefined],
    },
    {
      input: "CLOSING - 10",
      expected: ["CLOSING", "-", "10"],
    },
    {
      input: "CLOSING-10",
      expected: ["CLOSING", "-", "10"],
    },
  ];
  items.forEach(({ input, expected }, index) => {
    it(`should return correct results (case #${index + 1})`, (done) => {
      const timeOfDay = new TimeOfDay();
      const [period, operator, minutes] = timeOfDay.splitTime(input);
      expect(period).toEqual(expected[0]);
      expect(operator).toEqual(expected[1]);
      expect(minutes).toEqual(expected[2]);
      done();
    });
  });
});

describe("TimeOfDay.getStartEndTimeDates", () => {
  const items = [
    {
      input: {
        timeOfDay: {
          title: "Opening - Start of Shift",
          slug: "opening-start-of-shift",
          startTime: "OPENING + 0",
          endTime: "OPENING + 60",
        },
        params: {
          opening: 1578387600,
          closing: 1578416400,
          timezoneId: "Australia/Sydney",
          frequency: "daily",
        },
      },
      expected: {
        startTime: 1578387600,
        endTime: 1578391200,
      },
    },
    {
      input: {
        timeOfDay: {
          title: "Opening - Start of Shift",
          slug: "opening-start-of-shift",
          startTime: "OPENING",
          endTime: "OPENING+60",
        },
        params: {
          opening: 1578387600,
          closing: 1578416400,
          timezoneId: "Australia/Sydney",
          frequency: "daily",
        },
      },
      expected: {
        startTime: 1578387600,
        endTime: 1578391200,
      },
    },
    {
      input: {
        timeOfDay: {
          title: "Opening - Start of Shift",
          slug: "opening-start-of-shift",
          startTime: "  OPENING-30  ",
          endTime: "CLOSING-10  ",
        },
        params: {
          opening: 1578387600,
          closing: 1578416400,
          timezoneId: "Australia/Sydney",
          frequency: "daily",
        },
      },
      expected: {
        startTime: 1578385800,
        endTime: 1578415800,
      },
    },
    {
      input: {
        timeOfDay: {
          title: "Opening - Start of Shift",
          slug: "opening-start-of-shift",
          startTime: "1000",
          endTime: "1645",
        },
        params: {
          opening: 1578387600,
          closing: 1578416400,
          timezoneId: "Australia/Sydney",
          frequency: "daily",
        },
      },
      expected: {
        startTime: 1578438000,
        endTime: 1578462300,
      },
    },
  ];
  items.forEach(({ input, expected }, index) => {
    it(`should return correct start time and end time (case #${
      index + 1
    })`, (done) => {
      const timeOfDay = TimeOfDay.unserialize(input.timeOfDay);
      const { opening, closing, timezoneId } = input.params;
      const { startTime, endTime } = timeOfDay.getStartEndTimeDates(
        opening,
        closing,
        timezoneId,
      );
      expect(startTime).toEqual(expected.startTime);
      expect(endTime).toEqual(expected.endTime);
      done();
    });
  });
});
