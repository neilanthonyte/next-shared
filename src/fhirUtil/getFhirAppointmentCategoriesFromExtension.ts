import {
  npAppointmentCategoriesExtensionUrl,
  npAppointmentCategoryExtensionUrl,
  npAppointmentCategorySystem,
} from "../helpers/constants";

/**
 * Return the categories codings from list of appointment extensions
 */
export const getFhirAppointmentCategoriesFromExtension = (
  extensions?: fhir4.Extension[],
): fhir4.Coding[] => {
  if (!extensions || extensions.length === 0) {
    return null;
  }

  const categoriesExtension = extensions.find(
    (e) => e.url === npAppointmentCategoriesExtensionUrl,
  );

  return categoriesExtension?.extension
    ?.filter(
      (catExt) =>
        catExt.url === npAppointmentCategoryExtensionUrl &&
        catExt.valueCoding.system === npAppointmentCategorySystem,
    )
    ?.map((catExt) => catExt.valueCoding);
};
