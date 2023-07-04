import moment from "moment-timezone";
import { generateMockAction } from "../../mockData/generateMockActions";
import { EWeekday } from "../../types/IReoccurringTime";
import { filterActionsByDate } from "../filterActionsByDate";

const mockFilterDate = "2021-11-22";

const mockActionWeeklyOccurrence = generateMockAction({
  title: "Expected weekly action",
  occurrences: [
    {
      type: "week",
      timeOfDay: [
        {
          hour: 9,
          minute: 30,
        },
      ],
      weekdays: [EWeekday.Monday],
    },
  ],
  activeAt: 1635774072, // Old date, so that the test is controlled. 2021-11-01
});

const mockActionSingleOccurrence = generateMockAction({
  title: "Expected single action",
  occurrences: [
    {
      type: "single",
      time: moment(`${mockFilterDate} 08:30`).tz("Australia/Sydney").unix(), // It's a Monday
    },
  ],
  activeAt: 1635774072,
});

const mockActionMonthlyOccurrence = generateMockAction({
  title: "Expected monthly action",
  occurrences: [
    {
      type: "month",
      days: [1, 22, 28],
      timeOfDay: [
        {
          hour: 4,
          minute: 15,
        },
      ],
    },
  ],
  activeAt: 1635774072,
});

const mockUnexpectedMonthlyOccurrence = generateMockAction({
  title: "Unexpected monthly action",
  occurrences: [
    {
      type: "month",
      days: [1, 28],
      timeOfDay: [
        {
          hour: 4,
          minute: 15,
        },
      ],
    },
  ],
  activeAt: 1635774072,
});

const mockUnexpectedActionSingleOccurrence = generateMockAction({
  title: "Unexpected single action",
  occurrences: [
    {
      type: "single",
      time: moment(`2021-11-30 08:30`).unix(), // It's a Tuesday
    },
  ],
  activeAt: 1635774072,
});

describe("filterActionsByDate", () => {
  it("can filter actions with a valid date", () => {
    const allActions = [
      mockActionWeeklyOccurrence,
      mockActionSingleOccurrence,
      mockActionMonthlyOccurrence,
      mockUnexpectedActionSingleOccurrence,
      mockUnexpectedMonthlyOccurrence,
    ];

    const resultActions = filterActionsByDate(allActions, mockFilterDate);
    expect(resultActions).toHaveLength(3);
    expect(resultActions).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          title: "Expected weekly action",
        }),
        expect.objectContaining({
          title: "Expected monthly action",
        }),
        expect.objectContaining({
          title: "Expected single action",
        }),
      ]),
    );

    expect(resultActions).not.toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          title: "Unexpected single action",
        }),
        expect.objectContaining({
          title: "Unexpected monthly action",
        }),
      ]),
    );
  });

  it("shouldn't filter actions with an invalid date", () => {
    const expectedActions = [
      mockActionWeeklyOccurrence,
      mockActionSingleOccurrence,
      mockActionMonthlyOccurrence,
      mockUnexpectedActionSingleOccurrence,
      mockUnexpectedMonthlyOccurrence,
    ];

    expect(() =>
      filterActionsByDate(expectedActions, "12341234-hello-world"),
    ).toThrowError(new Error("unknown date format"));
  });

  it("should generate virtual fulfillments if the actions are active and the filter date is in the future", () => {
    const allActions = [
      mockActionWeeklyOccurrence,
      mockActionSingleOccurrence,
      mockUnexpectedActionSingleOccurrence,
    ];

    const mondayInTwoWeeksTime = moment()
      .add(2, "weeks")
      .isoWeekday(1)
      .format("YYYY-MM-DD");

    const resultActions = filterActionsByDate(allActions, mondayInTwoWeeksTime);
    expect(resultActions).toHaveLength(1); // Should only be the action weekly occurrence
    resultActions.forEach((action) => {
      expect(action.fulfillments.length).toBeGreaterThan(0);
      expect(action.title).toBe("Expected weekly action");
    });
  });
});
