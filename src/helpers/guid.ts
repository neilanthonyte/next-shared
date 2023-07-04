import * as uuid from "uuid";

export function createGuid(length?: number): string {
  return uuid.v4().substr(0, length || Infinity);
}
