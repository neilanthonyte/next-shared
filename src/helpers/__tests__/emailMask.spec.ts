import { emailMask } from "next-shared/src/helpers/emailMask";

test("simpleEmail", () => {
  const email = "john.doe@example.com";
  const obfuscatedEmail = emailMask(email);
  expect(obfuscatedEmail).toEqual("j******e@e******.com");
});

test("complexEmail", () => {
  const email = "john.doe+funstuff1234@example.com.au";
  const obfuscatedEmail = emailMask(email);
  expect(obfuscatedEmail).toEqual("j*******************4@e******.com.au");
});
