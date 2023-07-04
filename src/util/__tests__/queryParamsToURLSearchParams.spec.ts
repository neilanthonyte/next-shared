import { queryParamsToURLSearchParams } from "../queryParamsToURLSearchParams";

describe("queryParamsToURLSearchParams", () => {
  it("can convert URL search param string into URL search param object", () => {
    const mockSearchString = "a=2&b=3&c=4&c=5";

    const mockSearchParams = queryParamsToURLSearchParams(mockSearchString);

    expect(mockSearchParams).toBeInstanceOf(URLSearchParams);
    expect(mockSearchParams.get("a")).toEqual("2");
    expect(mockSearchParams.get("b")).toEqual("3");
    expect(mockSearchParams.getAll("c")).toEqual(["4", "5"]);
  });

  it("can convert query param object into URL search param object", () => {
    const mockQueryParams = {
      a: "2",
      b: "3",
      c: ["4", "5"],
    };
    const mockSearchParams = queryParamsToURLSearchParams(mockQueryParams);

    expect(mockSearchParams).toBeInstanceOf(URLSearchParams);
    expect(mockSearchParams.get("a")).toEqual("2");
    expect(mockSearchParams.get("b")).toEqual("3");
    expect(mockSearchParams.getAll("c")).toEqual(["4", "5"]);
  });
});
