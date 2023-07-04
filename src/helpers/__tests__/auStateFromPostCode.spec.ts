import { auStateFromPostCode } from "next-shared/src/helpers/auStateFromPostCode";

test("NSW", () => {
  const postcode = "2021";
  const state = auStateFromPostCode(postcode);
  expect(state).toEqual("NSW");
});

test("VIC", () => {
  const postcode = "3321";
  const state = auStateFromPostCode(postcode);
  expect(state).toEqual("VIC");
});

test("ACT", () => {
  const postcode = "2617";
  const state = auStateFromPostCode(postcode);
  expect(state).toEqual("ACT");
});

test("QLD", () => {
  const postcode = "4021";
  const state = auStateFromPostCode(postcode);
  expect(state).toEqual("QLD");
});

test("SA", () => {
  const postcode = "5400";
  const state = auStateFromPostCode(postcode);
  expect(state).toEqual("SA");
});

test("WA", () => {
  const postcode = "6311";
  const state = auStateFromPostCode(postcode);
  expect(state).toEqual("WA");
});

test("TAS", () => {
  const postcode = "7832";
  const state = auStateFromPostCode(postcode);
  expect(state).toEqual("TAS");
});

test("NT", () => {
  const postcode = "832";
  const state = auStateFromPostCode(postcode);
  expect(state).toEqual("NT");
});

test("Reserved", () => {
  const postcode = "6798";
  const state = auStateFromPostCode(postcode);
  expect(state).toEqual("");
});
