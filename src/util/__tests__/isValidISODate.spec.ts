import { isValidISODate } from "../isValidISODate";
describe("isValidISODate_checks", () => {
  test("isValidISODate_true", () => {
    const goodISODate = "2021-11-09";
    const validISODate = isValidISODate(goodISODate);
    expect(validISODate).toEqual(true);
  });

  test("isValidISODateTimeZ_true", () => {
    const goodISODate = "2021-11-09T12:21:00Z";
    const validISODate = isValidISODate(goodISODate);
    expect(validISODate).toEqual(true);
  });

  test("isValidISODateTimeOffset_true", () => {
    const goodISODate = "2021-11-09T12:21:00+10:00";
    const validISODate = isValidISODate(goodISODate);
    expect(validISODate).toEqual(true);
  });

  test("isValidISODate_false", () => {
    const badISODate = "2021-13-09";
    const validISODate = isValidISODate(badISODate);
    expect(validISODate).toEqual(false);
  });

  test("isValidISODateTime_false", () => {
    const badISODate = "2021-11-09T12:65:00Z";
    const validISODate = isValidISODate(badISODate);
    expect(validISODate).toEqual(false);
  });
});
