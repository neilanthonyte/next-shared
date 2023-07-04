import { withoutUndefinedFields } from "../withoutUndefinedFields";

it("returns a cloned object without any changes when nothing is undefined", () => {
  const obj: Record<keyof unknown, unknown> = {
    a: 1,
    b: "hello",
    c: null,
    d: ["hello"],
    e: { f: 2 },
  };
  expect(withoutUndefinedFields(obj)).toEqual(obj);
});

it("returns  a cloned object with all undefined fields removed from objects", () => {
  const obj: Record<keyof unknown, unknown> = {
    a: 1,
    b: undefined,
    c: null,
    d: ["hello"],
    e: { f: undefined, g: 2 },
  };
  expect(withoutUndefinedFields(obj)).toEqual({
    a: 1,
    c: null,
    d: ["hello"],
    e: { g: 2 },
  });
});

it("returns a cloned array without without removing undefined elements", () => {
  const arr = [1, undefined, 2];
  expect(withoutUndefinedFields(arr)).toEqual(arr);
});

it("does not mutate the original object", () => {
  const obj: Record<keyof unknown, unknown> = {
    a: 1,
    b: undefined,
    c: null,
    d: ["hello"],
    e: { f: undefined, g: 2 },
  };
  withoutUndefinedFields(obj);
  expect(obj).toEqual({
    a: 1,
    b: undefined,
    c: null,
    d: ["hello"],
    e: { f: undefined, g: 2 },
  });
});
