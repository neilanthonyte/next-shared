import { isValidTimezone } from "../isValidTimezone";

describe("isValidTimezone", () => {
  const mockValidTimezones = [
    "Australia/Sydney",
    "Australia/Brisbane",
    "Australia/Perth",
    "Australia/Melbourne",
    "Australia/Adelaide",
  ];

  it("should return false for an invalid timezone", () => {
    const fakeTimezone = "Arrakis/Arrakeen";
    expect(isValidTimezone(fakeTimezone)).toEqual(false);
  });

  it("should retun false for an empty timezone", () => {
    expect(isValidTimezone("")).toEqual(false);
  });

  it.each(mockValidTimezones)(
    "should return true if it's a valid timezone like %s",
    (timezoneId) => {
      expect(isValidTimezone(timezoneId)).toEqual(true);
    },
  );
});
