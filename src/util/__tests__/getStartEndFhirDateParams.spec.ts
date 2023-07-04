import { getStartEndFhirDateParams } from "next-shared/src/util/getStartEndFhirDateParams";

describe("getStartEndFhirDateParam_Util", () => {
  test("getStartEndFhirDateParam_startAndEnd_localNoOffset", () => {
    const dateParam = ["ge2021-11-09T11:30:00", "le2021-11-11T11:30:00"];
    const { startAfter, startBefore } = getStartEndFhirDateParams(dateParam);
    // this uses server local timezone, so calculate expected in the same runtime
    const expectedStartAfter = Math.floor(
      Date.parse("2021-11-09T00:00:00") / 1000,
    );
    const expectedStartBefore = Math.floor(
      Date.parse("2021-11-11T23:59:59") / 1000,
    );
    expect({ startAfter, startBefore }).toEqual({
      startAfter: expectedStartAfter,
      startBefore: expectedStartBefore,
    });
  });

  test("getStartEndFhirDateParam_endOnly_zuluUTC", () => {
    const dateParam = ["le2021-11-11T11:30:00Z"];
    const { startAfter, startBefore } = getStartEndFhirDateParams(dateParam);
    expect({ startAfter, startBefore }).toEqual({
      startAfter: undefined,
      startBefore: 1636675199,
    });
  });

  test("getStartEndFhirDateParam_startOnly_offset", () => {
    const dateParam = "ge2021-11-09T11:30:00+10:00";
    const { startAfter, startBefore } = getStartEndFhirDateParams(dateParam);
    expect({ startAfter, startBefore }).toEqual({
      startAfter: 1636380000,
      startBefore: undefined,
    });
  });
});
