import { isValidODBCDate } from "../isValidODBCDate";

describe("isValidODBCDate_checks", () => {
  test("isValidODBCDate_true", () => {
    const goodODBCDate = "2021-11-09";
    const validODBCDate = isValidODBCDate(goodODBCDate);
    expect(validODBCDate).toEqual(true);
  });

  test("isValidODBCDate_false", () => {
    const badODBCDate = "2021-13-09";
    const validODBCDate = isValidODBCDate(badODBCDate);
    expect(validODBCDate).toEqual(false);
  });
});
