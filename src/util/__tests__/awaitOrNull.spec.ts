import { awaitOrNull } from "../awaitOrNull";

it("returns the underlying promise's value on success", async () => {
  const result = await awaitOrNull(Promise.resolve(123));
  expect(result).toBe(123);
});

it("resolves to null on failure", async () => {
  const result = await awaitOrNull(Promise.reject(123));
  expect(result).toBe(null);
});

it("doesn't call onError on success", async () => {
  const onError = jest.fn();
  await awaitOrNull(Promise.resolve(123), onError);
  expect(onError).not.toBeCalled();
});

it("calls onError on failure", async () => {
  const onError = jest.fn();
  await awaitOrNull(Promise.reject(123), onError);
  expect(onError).toBeCalled();
});

it("doesn't throw an exception when onError throws", async () => {
  const onError = () => {
    throw new Error("test");
  };
  const result = await awaitOrNull(Promise.reject(123), onError);
  expect(result).toBe(null);
});
