import { endOfDayISOToUnixTimestamp } from "../endOfDayISOToUnixTimestamp";
import { startOfDayISOToUnixTimestamp } from "../startOfDayISOToUnixTimestamp";

describe("startOf_EndOf_DayISOToUnixTimestamp", () => {
  test("startOfDayISOToUnixTimestamp_local", () => {
    const isoDate = "2021-11-11T12:00:00";
    const startOfDayUnix = startOfDayISOToUnixTimestamp(isoDate);
    // handle the timezone offset this runs in
    const checkDatetime = Math.floor(Date.parse("2021-11-11T00:00:00") / 1000);
    expect(startOfDayUnix).toEqual(checkDatetime);
  });

  test("startOfDayISOToUnixTimestamp_UTC", () => {
    const isoDate = "2021-11-11T12:00:00Z";
    const startOfDayUnix = startOfDayISOToUnixTimestamp(isoDate);
    expect(startOfDayUnix).toEqual(1636588800);
  });

  test("startOfDayISOToUnixTimestamp_offset", () => {
    const isoDate = "2021-11-11T12:00:00+10:00";
    const startOfDayUnix = startOfDayISOToUnixTimestamp(isoDate);
    expect(startOfDayUnix).toEqual(1636552800);
  });

  test("endOfDayISOToUnixTimestamp_local", () => {
    const isoDate = "2021-11-11T12:00:00";
    const endOfDayUnix = endOfDayISOToUnixTimestamp(isoDate);
    // handle the timezone offset this runs in
    const checkDatetime = Math.floor(Date.parse("2021-11-11T23:59:59") / 1000);
    expect(endOfDayUnix).toEqual(checkDatetime);
  });

  test("endOfDayISOToUnixTimestamp_UTC", () => {
    const isoDate = "2021-11-11T12:00:00Z";
    const endOfDayUnix = endOfDayISOToUnixTimestamp(isoDate);
    expect(endOfDayUnix).toEqual(1636675199);
  });

  test("endOfDayISOToUnixTimestamp_offset", () => {
    const isoDate = "2021-11-11T12:00:00+10:00";
    const endOfDayUnix = endOfDayISOToUnixTimestamp(isoDate);
    expect(endOfDayUnix).toEqual(1636639199);
  });
});
