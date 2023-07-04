import { getInitialsFromFullName } from "../getInitialsFromFullName";

test("returns only one character if only one word name is provided", () => {
  const initials = getInitialsFromFullName("Mark");
  expect(initials).toEqual("M");
});

test("returns two characters if a two words name is provided", () => {
  const initials = getInitialsFromFullName("Mark Porter");
  expect(initials).toEqual("MP");
});

test("returns first and last word initials if a more than two words name is provided", () => {
  const initials = getInitialsFromFullName("Mark Porter Junior");
  expect(initials).toEqual("MJ");
});

test("returns an empty string if a falsey value is provided", () => {
  let initials = getInitialsFromFullName(undefined);
  expect(initials).toEqual("");
  initials = getInitialsFromFullName(null);
  expect(initials).toEqual("");
  initials = getInitialsFromFullName("");
  expect(initials).toEqual("");
});

test("correctly handles empty spaces", () => {
  let initials = getInitialsFromFullName("");
  expect(initials).toEqual("");
  initials = getInitialsFromFullName(" ");
  expect(initials).toEqual("");
  initials = getInitialsFromFullName("   ");
  expect(initials).toEqual("");
  initials = getInitialsFromFullName("Mark   ");
  expect(initials).toEqual("M");
  initials = getInitialsFromFullName("   Mark   ");
  expect(initials).toEqual("M");
});
