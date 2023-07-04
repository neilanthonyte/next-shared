import {
  npAppointmentCategoriesExtensionUrl,
  npAppointmentCategoryExtensionUrl,
  npAppointmentCategorySystem,
} from "../helpers/constants";

/**
 * Generate an Appointment Category extension. This is mainly used by Hello Health.
 */
export const generateFhirAppointmentCategoryExtension = (
  categoryCode: string,
  categoryName?: string,
): fhir4.Extension => {
  const valueCoding: fhir4.Coding = {
    system: npAppointmentCategorySystem,
    code: categoryCode,
  };

  if (categoryName) {
    valueCoding.display = categoryName;
  }

  return {
    url: npAppointmentCategoriesExtensionUrl,
    extension: [
      {
        url: npAppointmentCategoryExtensionUrl,
        valueCoding,
      },
    ],
  };
};
