import { splitName } from "../splitName";

it("returns [undefined, undefined] when supplied with an empty string", () =>
  expect(splitName("")).toEqual([undefined, undefined]));

it("returns only the first name when supplied with a first name only", () =>
  expect(splitName("John")).toEqual(["John", undefined]));

it("returns first and last names when supplied with both", () =>
  expect(splitName("John Wick")).toEqual(["John", "Wick"]));

it("puts all words except the last name into the first name", () =>
  expect(splitName("John James Wick")).toEqual(["John James", "Wick"]));

it("strips extra white space", () =>
  expect(splitName("  John    James   Wick\t")).toEqual([
    "John James",
    "Wick",
  ]));
