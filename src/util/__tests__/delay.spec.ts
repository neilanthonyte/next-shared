import { delay } from "next-shared/src/util/delay";

test("Resolves after given delay", async () => {
  const testTimeout = 50;

  const startTime = Date.now();
  await delay(50);
  const endTime = Date.now();

  const timeTaken = endTime - startTime;
  const tolerance = 15;

  expect(timeTaken > testTimeout - tolerance).toBe(true);
});
