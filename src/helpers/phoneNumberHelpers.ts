import {
  isValidPhoneNumber as isValid,
  parsePhoneNumber,
} from "libphonenumber-js";

const DEFAULT_COUNTRY = "AU";
const DIGIT_STRING_REX = /^[0-9_.()\s+]+$/;

/**
 * Parses and converts the number to Australian format (eg. 0491 572 665).
 */
export const toNationalFormat = (phoneNumber: string): string | null => {
  let parsed;

  try {
    parsed = parsePhoneNumber(phoneNumber, DEFAULT_COUNTRY);
  } catch {
    return null;
  }

  if (!parsed.isValid()) {
    return null;
  }

  return parsed.country === "AU"
    ? parsed.formatNational()
    : parsed.formatInternational();
};

/**
 * Parses and converts the number to E.164 format (eg. +61491572665).
 */
export const toUnformattedInternational = (
  phoneNumber: string | null,
): string | null => {
  let parsed;

  try {
    parsed = parsePhoneNumber(phoneNumber, DEFAULT_COUNTRY);
  } catch {
    return null;
  }

  if (!parsed.isValid()) {
    return null;
  }

  return parsed.format("E.164");
};

/**
 * Parses the supplied phone numbers and determines whether they're the same, regardless of formatting. If parsing
 * fails (eg. one is null or undefined), then strict equality is used.
 *
 * @returns true if both parameters are the same phone number, regardless of formatting.
 */
export const isSamePhoneNumber = (a: string, b: string): boolean => {
  try {
    return parsePhoneNumber(a, DEFAULT_COUNTRY).isEqual(
      parsePhoneNumber(b, DEFAULT_COUNTRY),
    );
  } catch {
    return a === b;
  }
};

/**
 * Determines whether the supplied string is a valid phone number.
 */
export const isValidPhoneNumber = (phoneNumber: string): boolean => {
  if (!DIGIT_STRING_REX.test(phoneNumber)) {
    return false;
  }
  try {
    return isValid(phoneNumber, DEFAULT_COUNTRY);
  } catch {
    return false;
  }
};

export const isValidFixedLineNumber = (phoneNumber: string): boolean => {
  if (!DIGIT_STRING_REX.test(phoneNumber)) {
    return false;
  }

  let parsed;
  try {
    parsed = parsePhoneNumber(phoneNumber, DEFAULT_COUNTRY);
  } catch {
    return false;
  }
  return (
    parsed.isValid() &&
    parsed.getType() !== "MOBILE" &&
    ["TOLL_FREE", "FIXED_LINE", "SHARED_COST", "PREMIUM_RATE"].indexOf(
      parsed.getType(),
    ) !== -1
  );
};

/**
 * Determines whether the supplied string is a valid mobile number.
 */
export const isValidMobileNumber = (phoneNumber: string) => {
  if (!DIGIT_STRING_REX.test(phoneNumber)) {
    return false;
  }

  let parsed;
  try {
    parsed = parsePhoneNumber(phoneNumber, DEFAULT_COUNTRY);
  } catch {
    return false;
  }
  return parsed.isValid() && parsed.getType() === "MOBILE";
};
