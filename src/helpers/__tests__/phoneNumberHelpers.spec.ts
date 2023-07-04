import {
  isSamePhoneNumber,
  isValidMobileNumber,
  isValidPhoneNumber,
  isValidFixedLineNumber,
  toNationalFormat,
  toUnformattedInternational,
} from "../phoneNumberHelpers";

describe("isSamePhoneNumber", () => {
  it("recognises an international and domestic Australian number as the same when they are", () => {
    const result = isSamePhoneNumber("02 9157 2665", "+61 (2) 91 572 665");
    expect(result).toBe(true);
  });

  it("recognises two different numbers as different", () => {
    const result = isSamePhoneNumber("0491 572 665", "0492572665");
    expect(result).toBe(false);
  });

  it("returns false when one of the numbers is null", () => {
    const result = isSamePhoneNumber("02 9157 2665", null);
    expect(result).toBe(false);
  });

  it("treats two nulls as the same", () => {
    const result = isSamePhoneNumber(null, null);
    expect(result).toBe(true);
  });
});

describe("toUnformattedInternational", () => {
  test("successfully converts a standard Australian mobile number", () => {
    const mobile = "0491 570 006";
    const cleanMobile = toUnformattedInternational(mobile);
    expect(cleanMobile).toEqual("+61491570006");
  });

  test("successfully converts a complex Australian mobile number", () => {
    const mobile = "+61 (4) 91 570 006";
    const cleanMobile = toUnformattedInternational(mobile);
    expect(cleanMobile).toEqual("+61491570006");
  });

  test("returns null when no string supplied", () => {
    const mobile: string = null;
    const cleanMobile = toUnformattedInternational(mobile);
    expect(cleanMobile).toEqual(null);
  });
});

describe("toNationalFormat", () => {
  it("formats Australian mobile numbers correctly", () => {
    const converted = toNationalFormat("+61491570737");
    expect(converted).toStrictEqual("0491 570 737");
  });

  it("formats Australian land-line numbers correctly", () => {
    const converted = toNationalFormat("+61291570378");
    expect(converted).toStrictEqual("(02) 9157 0378");
  });

  it("keeps the country code for overseas numbers", () => {
    // French number: https://en.wikipedia.org/wiki/Fictitious_telephone_number#France
    const converted = toNationalFormat("+33639984678");
    expect(converted).toStrictEqual("+33 6 39 98 46 78");
  });
});

describe("isValidPhoneNumber", () => {
  it("validate number with international format correctly for land line", () => {
    const mockNumberWithPlus = "+61283113580";
    const mockNumberWithParenthesis = "(+612)83113580";
    const mockNumberWithSpace = "+612 8311 3580";

    expect(isValidPhoneNumber(mockNumberWithPlus));
    expect(isValidPhoneNumber(mockNumberWithParenthesis));
    expect(isValidPhoneNumber(mockNumberWithSpace));
  });

  it("validate number without international format correctly for land line", () => {
    const mockNumberWithParenthesis = "(02)83113580";
    const mockNumberWithSpace = "02 8311 3580";
    expect(isValidPhoneNumber(mockNumberWithParenthesis));
    expect(isValidPhoneNumber(mockNumberWithSpace));
  });

  it("validate number with international format correctly for mobile", () => {
    const mockNumberWithPlus = "+61483113580";
    const mockNumberWithParenthesis = "(+614)83113580";
    const mockNumberWithSpace = "+614 8311 3580";
    expect(isValidPhoneNumber(mockNumberWithPlus));
    expect(isValidPhoneNumber(mockNumberWithParenthesis));
    expect(isValidPhoneNumber(mockNumberWithSpace));
  });

  it("validate number without international format correctly for mobile", () => {
    const mockNumberWithoutInternationalCode = "0483113580";
    const mockNumberWithParenthesis = "(04)83113580";
    const mockNumberWithSpace = "04 8311 3580";
    expect(isValidPhoneNumber(mockNumberWithoutInternationalCode));
    expect(isValidPhoneNumber(mockNumberWithParenthesis));
    expect(isValidPhoneNumber(mockNumberWithSpace));
  });
});

describe("isValidMobile phone number", () => {
  it("validate number with international format correctly", () => {
    const mockNumberWithInternationalCode = "+61483113580";
    const mockNumberWithParenthesis = "(+614)83113580";
    const mockNumberWithSpace = "+614 8311 3580";
    expect(isValidMobileNumber(mockNumberWithInternationalCode));
    expect(isValidMobileNumber(mockNumberWithParenthesis));
    expect(isValidMobileNumber(mockNumberWithSpace));
  });

  it("validate number without international format correctly", () => {
    const mockNumberWithoutInternationalCode = "0483113580";
    const mockNumberWithParenthesis = "(04)83113580";
    const mockNumberWithSpace = "04 8311 3580";
    expect(isValidMobileNumber(mockNumberWithoutInternationalCode));
    expect(isValidMobileNumber(mockNumberWithParenthesis));
    expect(isValidMobileNumber(mockNumberWithSpace));
  });
});

describe("isValidFixedLineNumber phone number", () => {
  it("validate number with international format correctly", () => {
    const mockNumberWithInternationalCode = "+61483113580";
    const mockNumberWithParenthesis = "(+614)83113580";
    const mockNumberWithSpace = "+614 8311 3580";
    expect(isValidFixedLineNumber(mockNumberWithInternationalCode));
    expect(isValidFixedLineNumber(mockNumberWithParenthesis));
    expect(isValidFixedLineNumber(mockNumberWithSpace));
  });

  it("validate number without international format correctly", () => {
    const mockNumberWithoutInternationalCode = "0483113580";
    const mockNumberWithParenthesis = "(04)83113580";
    const mockNumberWithSpace = "04 8311 3580";
    expect(isValidFixedLineNumber(mockNumberWithoutInternationalCode));
    expect(isValidFixedLineNumber(mockNumberWithParenthesis));
    expect(isValidFixedLineNumber(mockNumberWithSpace));
  });
});
