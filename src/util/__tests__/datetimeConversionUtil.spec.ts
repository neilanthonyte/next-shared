import * as datetimeConversion from "next-shared/src/util/datetimeConversion";

describe("datetimeConversionUtils", () => {
  test("timestampTZToUnixTimestamp", () => {
    const timestampTZString = "2021-11-09 11:11:24-05";
    const unixConversionInteger =
      datetimeConversion.timestampTZToUnixTimestamp(timestampTZString);
    expect(unixConversionInteger).toEqual(1636474284);
  });

  test("isoDateToUnixTimestamp", () => {
    const iso8601DatetimeString = "2021-11-09T16:11:24Z";
    const unixConversionInteger = datetimeConversion.isoDateToUnixTimestamp(
      iso8601DatetimeString,
    );
    expect(unixConversionInteger).toEqual(1636474284);
  });

  test("isoDateToUnixTimestamp_with_T_and_offset", () => {
    const iso8601DatetimeString = "2021-11-09T11:11:24-05:00";
    const unixConversionInteger = datetimeConversion.isoDateToUnixTimestamp(
      iso8601DatetimeString,
    );
    expect(unixConversionInteger).toEqual(1636474284);
  });

  test("unixTimestampToISODate", () => {
    const unixTimestamp = 1636474284;
    const iso8601DatetimeString =
      datetimeConversion.unixTimestampToISODate(unixTimestamp);
    expect(iso8601DatetimeString).toEqual("2021-11-09T16:11:24Z");
  });

  test("unixTimestampToISODateMilliseconds", () => {
    const unixTimestamp = 1636474284;
    const iso8601DatetimeString =
      datetimeConversion.unixTimestampToISODateMilliseconds(unixTimestamp);
    expect(iso8601DatetimeString).toEqual("2021-11-09T16:11:24.000Z");
  });

  test("jsTimestampToISODate", () => {
    const jsTimestamp = 1636474284000;
    const iso8601DatetimeString =
      datetimeConversion.jsTimestampToISODate(jsTimestamp);
    expect(iso8601DatetimeString).toEqual("2021-11-09T16:11:24.000Z");
  });

  test("unixTimestampToODBCString", () => {
    const unixTimestamp = 1636474284;
    const odbcDate =
      datetimeConversion.unixTimestampToODBCString(unixTimestamp);
    // Returns local date (e.g. next day AEST) based on timezone the test runs in
    // run the basic Date string manipulation to verify the result against runtime timezone
    // (basically a simplified version of what the functions will do, but hopefully ensures
    // stability across future changes)
    const checkDate = new Date(unixTimestamp * 1000);
    const checkDateString = `${checkDate.getFullYear()}-${(
      checkDate.getMonth() + 1
    )
      .toString()
      .padStart(2, "0")}-${checkDate.getDate().toString().padStart(2, "0")}`;
    expect(odbcDate).toEqual(checkDateString);
  });

  test("unixTimestampToJSTimestamp", () => {
    const unixTimestamp = 1636474284;
    const jsConversionInteger =
      datetimeConversion.unixTimestampToJSTimestamp(unixTimestamp);
    expect(jsConversionInteger).toEqual(1636474284000);
  });

  test("jsTimestampToUnixTimestamp", () => {
    const jsTimestamp = 1636474284000;
    const unixConversionInteger =
      datetimeConversion.jsTimestampToUnixTimestamp(jsTimestamp);
    expect(unixConversionInteger).toEqual(1636474284);
  });

  test("unixTimestampAddOneDay", () => {
    const unixTimestamp = 1636474284;
    const unixAddOneDay =
      datetimeConversion.unixTimestampAddOneDay(unixTimestamp);
    expect(unixAddOneDay).toEqual(1636560684);
  });

  test("unixTimestampSubtractOneDay", () => {
    const unixTimestamp = 1636474284;
    const unixAddOneDay =
      datetimeConversion.unixTimestampSubtractOneDay(unixTimestamp);
    expect(unixAddOneDay).toEqual(1636387884);
  });
});
