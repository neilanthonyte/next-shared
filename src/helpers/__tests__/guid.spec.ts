import { createGuid } from "next-shared/src/helpers/guid";

test("generates a 36 character string", () => {
  expect(createGuid().length).toBe(36);
});

test("generates different strings each time", () => {
  for (let i = 0; i < 1000; i++) {
    expect(createGuid()).not.toBe(createGuid());
  }
});
