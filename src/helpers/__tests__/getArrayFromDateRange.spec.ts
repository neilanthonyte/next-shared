import moment from "moment-timezone";
import { getArrayFromDateRange } from "next-shared/src/helpers/getArrayFromDateRange";

test("returns correct result for simple range", () => {
  const start = moment("2019-02-01").unix();
  const end = moment("2019-02-05").unix();

  const expectedResult = [
    "2019-02-01",
    "2019-02-02",
    "2019-02-03",
    "2019-02-04",
    "2019-02-05",
  ];

  const range = getArrayFromDateRange(start, end, "YYYY-MM-DD");
  expect(range).toEqual(expectedResult);
});

test("returns correct for ranges over a month", () => {
  const start = moment("2019-02-25").unix();
  const end = moment("2019-03-05").unix();

  const expectedResult = [
    "2019-02-25",
    "2019-02-26",
    "2019-02-27",
    "2019-02-28",
    "2019-03-01",
    "2019-03-02",
    "2019-03-03",
    "2019-03-04",
    "2019-03-05",
  ];

  const range = getArrayFromDateRange(start, end, "YYYY-MM-DD");
  expect(range).toEqual(expectedResult);
});

test("handles same day for start and end", () => {
  const start = moment("2019-02-25").unix();
  const end = moment("2019-02-25").unix();

  const expectedResult = ["2019-02-25"];

  const range = getArrayFromDateRange(start, end, "YYYY-MM-DD");
  expect(range).toEqual(expectedResult);
});

test("returns start date if end date is prior to start", () => {
  const start = moment("2019-02-25").unix();
  const end = moment("2019-02-24").unix();

  const expectedResult = ["2019-02-25"];

  const range = getArrayFromDateRange(start, end, "YYYY-MM-DD");
  expect(range).toEqual(expectedResult);
});
