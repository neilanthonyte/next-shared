/**
 * Builds a FHIR date string to the available precision.
 */
export const buildFhirDateString = (
  year: number,
  month?: number,
  day?: number,
): string => {
  const yearOnly = year.toString();

  if (!month) {
    return yearOnly;
  }

  const yearAndMonth = `${yearOnly}-${month.toString().padStart(2, "0")}`;

  if (!day) {
    return yearAndMonth;
  }

  return `${yearAndMonth}-${day.toString().padStart(2, "0")}`;
};
