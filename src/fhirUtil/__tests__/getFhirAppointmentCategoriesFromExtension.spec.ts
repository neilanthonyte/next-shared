import { getFhirAppointmentCategoriesFromExtension } from "../getFhirAppointmentCategoriesFromExtension";

describe("getFhirAppointmentCategoriesFromExtension", () => {
  it("should get only categories from extension", () => {
    const mockExtensions = [
      {
        url: "http://nextpracticehealth.com/extension/appointment-categories",
        extension: [
          {
            url: "http://nextpracticehealth.com/extension/appointment-category",
            valueCoding: {
              system:
                "http://nextpracticehealth.com/fhir/CodeSystem/appointment-category",
              code: "54",
              display: "Standard Consult",
            },
          },
        ],
      },
      {
        url: "http://nextpracticehealth.com/extension/not-appointment-categories",
        value: "some-mocked-value",
      },
      {
        url: "http://nextpracticehealth.com/extension/appointment-categories",
        extension: [
          {
            url: "http://nextpracticehealth.com/extension/appointment-category",
            valueCoding: {
              system:
                "http://nextpracticehealth.com/incorrect-appointment-type",
              code: "54",
              display: "Standard Consult",
            },
          },
        ],
      },
    ];

    const mockCategories =
      getFhirAppointmentCategoriesFromExtension(mockExtensions);

    expect(mockCategories).toHaveLength(1);
    expect(mockCategories[0]).toEqual({
      system:
        "http://nextpracticehealth.com/fhir/CodeSystem/appointment-category",
      code: "54",
      display: "Standard Consult",
    });
  });

  it("should return null if extension is null", () => {
    const mockCategories = getFhirAppointmentCategoriesFromExtension(null);
    expect(mockCategories).toBeNull();
  });

  it("should return null if extension is empty", () => {
    const mockCategories = getFhirAppointmentCategoriesFromExtension([]);
    expect(mockCategories).toBeNull();
  });
});
