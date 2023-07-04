import { parseUrl, ParsedQuery } from "query-string";

export const urlParamsToObject = (
  parseNumbers: boolean = true,
  parseBooleans: boolean = true,
): ParsedQuery<string | boolean | number> => {
  return parseUrl(window.location.href, {
    parseBooleans,
    parseNumbers,
    arrayFormat: "bracket",
  }).query;
};
