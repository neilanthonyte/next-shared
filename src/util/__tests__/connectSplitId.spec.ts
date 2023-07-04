import { connectSplitId } from "../connectSplitId";

describe("connectSplitId", () => {
  it("can split a standard formatted connect resource ID", () => {
    const expectedOutput = {
      tenantId: "my-tenant",
      resourceType: "patient",
      ehrId: "12",
      existingPath: null as null,
    };
    const connectResourceId = "my-tenant_patient_12";
    const connectResourceIdParts = connectSplitId(connectResourceId);
    expect(connectResourceIdParts).toEqual(expectedOutput);
  });

  it("can split a connect resource ID with URI prefix ", () => {
    const expectedOutput = {
      tenantId: "my-tenant",
      resourceType: "patient",
      ehrId: "12",
      existingPath:
        "https://connect-octo-dev.nextpracticeclinics.com/my-tenant/fhir/Patient/",
    };
    const connectResourceId =
      "https://connect-octo-dev.nextpracticeclinics.com/my-tenant/fhir/Patient/my-tenant_patient_12";
    const connectResourceIdParts = connectSplitId(connectResourceId);
    expect(connectResourceIdParts).toEqual(expectedOutput);
  });

  it("should throw an error when the resource ID cannot be parsed", () => {
    const mockResourceId = "asdfasdfasdf:asdfasdf:asdfasdf";
    expect(() => connectSplitId(mockResourceId)).toThrowError(
      `Unable to parse id '${mockResourceId}'`,
    );
  });

  it("should throw an error when the resource ID is empty", () => {
    expect(() => connectSplitId(undefined)).toThrowError(
      "Resource id cannot be empty",
    );
  });
});
