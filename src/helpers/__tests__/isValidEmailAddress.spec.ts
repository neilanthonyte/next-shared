import { isValidEmailAddress } from "next-shared/src/helpers/isValidEmailAddress";

describe("isValidEmailAddress", () => {
  it(`can validate email with the correct format of "name@domain.name" to be valid`, () => {
    expect(isValidEmailAddress("test@example.com")).toBe(true);
    expect(isValidEmailAddress("test@example.io")).toBe(true);
  });
  it(`can validate email with allowed special characters in the prefix to be valid`, () => {
    expect(isValidEmailAddress("a-b+123@gmail.com")).toBe(true);
    expect(isValidEmailAddress("a_b@gmail.com")).toBe(true);
    expect(isValidEmailAddress("dev.team@gmail.com")).toBe(true);
  });

  it(`can validate email with capital letters to be valid`, () => {
    expect(isValidEmailAddress("dev.team@GMAIl.COM")).toBe(true);
    expect(isValidEmailAddress("Dev.Team@gmail.com")).toBe(true);
  });

  it(`can validate email with invalid characters in the domain name to be invalid`, () => {
    expect(isValidEmailAddress("dev.team@@gmail.com")).toBe(false);
    expect(isValidEmailAddress("hello@a!b.com")).toBe(false);
  });
  it(`can validate malformed email address to be invalid`, () => {
    expect(isValidEmailAddress("hello@world")).toBe(false);
    expect(isValidEmailAddress("asdf")).toBe(false);
  });
  it(`can validate empty email address to be invalid`, () => {
    expect(isValidEmailAddress("")).toBe(false);
  });
});
