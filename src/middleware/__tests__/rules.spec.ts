import { generateMockSession } from "../../mockData/generateMockSession";
import { IRequestWithSession } from "../../types/IRequestWithSession";
import { rules } from "../rules";

describe("rules (express middleware)", () => {
  const mockSession = generateMockSession();
  const mockRequest = {
    body: {},
    session: mockSession,
  } as IRequestWithSession;

  // "any" is bad... but express response has about 74+ methods to mock...and is irrelevant to this test so...
  const mockResponse: any = {};
  const mockStatus = jest.fn().mockReturnValue(mockResponse);
  const mockJson = jest.fn().mockReturnValue(mockResponse);
  mockResponse.status = mockStatus;
  mockResponse.json = mockJson;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it(`should return a rule function that will set the response with status 401 and unauthorized`, () => {
    const mockSession = generateMockSession();
    const mockRequest = {
      body: {},
      session: mockSession,
    } as IRequestWithSession;

    const mockFailedRule = jest.fn(() => false);
    const mockValidate = rules([mockFailedRule]);

    mockValidate(mockRequest, mockResponse);

    expect(mockStatus).toBeCalledWith(401);
    expect(mockJson).toBeCalledWith({
      error: "Unauthorized",
    });
  });

  it(`should return a rule function that will set the response with status 401 and custom error message`, () => {
    const mockErrorMessage = "Mock rule failed";
    const mockFailedRule = jest.fn(() => "Mock rule failed");
    const mockValidate = rules([mockFailedRule]);

    mockValidate(mockRequest, mockResponse);

    expect(mockStatus).toBeCalledWith(401);
    expect(mockJson).toBeCalledWith({
      error: mockErrorMessage,
    });
  });

  // TODO - this tests current behaviour, but the behaviour should be revised. Null will trigger the error but undefined won't?
  it(`should throw an error if NextFunction is null`, () => {
    const mockFailedRule = jest.fn(() => false);
    const mockValidate = rules([mockFailedRule]);

    expect(() => mockValidate(mockRequest, mockResponse, null)).toThrowError(
      new Error(null),
    );
  });

  it(`should call the NextFunction if the rules passed`, () => {
    const mockSuccessfulRule = jest.fn(() => true);
    const mockNext = jest.fn();

    const mockValidate = rules([mockSuccessfulRule]);
    mockValidate(mockRequest, mockResponse, mockNext);

    expect(mockNext).toBeCalledTimes(1);
  });

  // TEST RULE COMBINATIONS
  it(`should fail if one of the rules in the rule set fails`, () => {
    const mockFailedRule = jest.fn(() => false);
    const mockSuccessRule = jest.fn(() => true);

    const mockRuleSet = [mockFailedRule, mockSuccessRule];

    const mockValidate = rules(mockRuleSet);
    mockValidate(mockRequest, mockResponse);

    expect(mockStatus).toBeCalledWith(401);
    expect(mockJson).toBeCalledWith({ error: "Unauthorized" });
  });

  it(`should pass if all of the rules in the rule set passes`, () => {
    const mockSuccessRule1 = jest.fn(() => true);
    const mockSuccessRule2 = jest.fn(() => true);

    const mockRuleSet = [mockSuccessRule1, mockSuccessRule2];

    const mockValidate = rules(mockRuleSet);
    mockValidate(mockRequest, mockResponse);

    expect(mockStatus).not.toBeCalled();
    expect(mockJson).not.toBeCalled();
  });

  it(`should pass if any of the rule set passes`, () => {
    const mockSuccessRule1 = jest.fn(() => true);
    const mockSuccessRule2 = jest.fn(() => true);
    // successful set.
    const mockRuleSet1 = [mockSuccessRule1, mockSuccessRule2];

    const mockFailedRule1 = jest.fn(() => false);

    // failed set
    const mockRuleSet2 = [mockFailedRule1];

    const mockValidate = rules(mockRuleSet1, mockRuleSet2);
    mockValidate(mockRequest, mockResponse);

    expect(mockStatus).not.toBeCalled();
    expect(mockJson).not.toBeCalled();
  });

  it(`should fail if none of the rule sets passed. `, () => {
    const mockSuccessRule1 = jest.fn(() => true);
    const mockFailedRule2 = jest.fn(() => false);
    // successful set.
    const mockRuleSet1 = [mockSuccessRule1, mockFailedRule2];

    const mockFailedRule1 = jest.fn(() => false);

    // failed set
    const mockRuleSet2 = [mockFailedRule1];

    const mockValidate = rules(mockRuleSet1, mockRuleSet2);
    mockValidate(mockRequest, mockResponse);

    expect(mockStatus).toBeCalledWith(401);
    expect(mockJson).toBeCalledWith({ error: "Unauthorized" });
  });

  // TODO - revise the behaviour...
  it(`should fail if none of the rule sets passed and return the string error message of the last rule test`, () => {
    const mockSuccessRule1 = jest.fn(() => true);
    const mockFailedRule2 = jest.fn(() => "Error message 1");
    // successful set.
    const mockRuleSet1 = [mockSuccessRule1, mockFailedRule2];

    const mockFailedRule1 = jest.fn(() => "Error message 2");

    // failed set
    const mockRuleSet2 = [mockFailedRule1];

    const mockValidate = rules(mockRuleSet1, mockRuleSet2);
    mockValidate(mockRequest, mockResponse);

    expect(mockStatus).toBeCalledWith(401);
    expect(mockJson).toBeCalledWith({ error: "Error message 2" });
  });
});
