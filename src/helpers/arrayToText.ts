export function arrayToText(arr: string[]) {
  return (
    arr.slice(0, -2).join(", ") +
    (arr.slice(0, -2).length ? ", " : "") +
    arr.slice(-2).join(" and ")
  );
}
