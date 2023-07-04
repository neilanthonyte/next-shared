import { validate, ValidationError } from "class-validator";
import { IsInReadonly } from "../IsInReadonly";

describe("@IsInReadonly class validator", () => {
  const mockConstants = ["a", "b", "c", "d"] as const;

  class MockClass {
    @IsInReadonly(mockConstants)
    public propertyOne: string;
  }

  it("should show that a class is valid if the property is one of the readonly values", async () => {
    const mockObject = new MockClass();
    mockObject.propertyOne = "a";
    // expect(async () => validate(mockObject)).toThrowError();
    const result = await validate(mockObject);

    // class validator validation will return an empty
    expect(result).toHaveLength(0);
  });

  it("should return a list of validation errors, if the property is not one of the readonly values", async () => {
    const mockObject = new MockClass();
    mockObject.propertyOne = "e";

    const result = await validate(mockObject);

    expect(result).toHaveLength(1);
    expect(result[0]).toBeInstanceOf(ValidationError);
    expect(result[0].constraints).toHaveProperty(
      "isInReadonly",
      `e is not in ${JSON.stringify(mockConstants)}`,
    );
  });
});
