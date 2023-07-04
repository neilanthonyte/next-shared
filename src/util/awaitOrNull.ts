/**
 * Await a promise and return null if it throws an error.
 *
 * @param promise the promise to await
 * @param onError optional -- a function to run when an error occurs (eg. for logging)
 */
export const awaitOrNull = async <T>(
  promise: Promise<T>,
  onError?: (error: unknown) => unknown,
): Promise<T | null> => {
  let result = null;
  try {
    result = await promise;
  } catch (error: unknown) {
    // we still want to return null if onError throws
    try {
      await onError?.(error);
    } catch (e) {
      // do nothing
    }

    return null;
  }
  return result;
};
