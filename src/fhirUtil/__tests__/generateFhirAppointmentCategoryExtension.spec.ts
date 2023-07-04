import {
  npAppointmentCategoriesExtensionUrl,
  npAppointmentCategoryExtensionUrl,
  npAppointmentCategorySystem,
} from "../../helpers/constants";
import { generateFhirAppointmentCategoryExtension } from "../generateFhirAppointmentCategoryExtension";

describe("generateFhirAppointmentCategoryExtension", () => {
  it("should generate an appointment with category code", () => {
    const mockCode = "100";

    const mockGeneratedExtension: fhir4.Extension =
      generateFhirAppointmentCategoryExtension(mockCode);

    expect(mockGeneratedExtension).toEqual({
      url: npAppointmentCategoriesExtensionUrl,
      extension: [
        {
          url: npAppointmentCategoryExtensionUrl,
          valueCoding: {
            system: npAppointmentCategorySystem,
            code: mockCode,
          },
        },
      ],
    });
  });

  it("should generate an appointment with category code and name", () => {
    const mockCode = "100";
    const mockName = "Mock appointment type";

    const mockGeneratedExtension: fhir4.Extension =
      generateFhirAppointmentCategoryExtension(mockCode, mockName);

    expect(mockGeneratedExtension).toEqual({
      url: npAppointmentCategoriesExtensionUrl,
      extension: [
        {
          url: npAppointmentCategoryExtensionUrl,
          valueCoding: {
            system: npAppointmentCategorySystem,
            code: mockCode,
            display: mockName,
          },
        },
      ],
    });
  });
});
