import { getFilteredDates } from "../getFilteredDates";

describe("getFilteredDates", () => {
  it("can return the unix timestamps of the start and end date time of a date range in the LOCAL timezone", () => {
    const fakeStartTime = Math.floor(
      Date.parse("2022-01-02T14:32:00.000") / 1000,
    );
    const fakeEndTime = Math.floor(
      Date.parse("2022-01-15T09:11:00.000") / 1000,
    );

    const expectedStartOfDayInRange = Math.floor(
      Date.parse("2022-01-02T00:00:00.000") / 1000,
    );
    const expectedEndOfDayInRange = Math.floor(
      Date.parse("2022-01-15T23:59:59.999") / 1000,
    );

    const [mockStart, mockEnd] = getFilteredDates(fakeStartTime, fakeEndTime);

    expect(mockStart).toEqual(expectedStartOfDayInRange);
    expect(mockEnd).toEqual(expectedEndOfDayInRange);
  });
});
