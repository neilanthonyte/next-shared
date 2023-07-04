// TODO unit test the exported functions in this file
import {
  loincOrgURI,
  observationComponentDisplayNameExtensionUrl,
  observationComponentRawCodeExtensionUrl,
} from "./constants";

const buildObservationComponent = <T>(
  loinc: string,
  displayName: string,
  valueKey: string,
  value: T,
): fhir4.ObservationComponent | null => {
  if (
    value === null ||
    value === undefined ||
    (typeof value === "number" && !isFinite(value))
  ) {
    return null;
  }

  return {
    extension: [
      {
        url: observationComponentRawCodeExtensionUrl,
        valueString: loinc,
      },
      {
        url: observationComponentDisplayNameExtensionUrl,
        valueString: displayName,
      },
    ],
    code: {
      coding: [
        {
          system: loincOrgURI,
          code: loinc,
        },
      ],
    },
    [valueKey]: value,
  };
};

/**
 * Builds and returns FHIR Observation component object using the supplied LOINC code, display name, and string value.
 *
 * Note that this function will return null if the runtime value is null or undefined.
 */
export const buildStringObservationComponent = (
  loinc: string,
  displayName: string,
  value: string,
) => buildObservationComponent(loinc, displayName, "valueString", value);

/**
 * Builds and returns FHIR Observation component object using the supplied LOINC code, display name, and boolean value.
 *
 * Note that this function will return null if the runtime value is null or undefined.
 */
export const buildBooleanObservationComponent = (
  loinc: string,
  displayName: string,
  value: boolean,
) => buildObservationComponent(loinc, displayName, "valueBoolean", value);

/**
 * Builds and returns FHIR Observation component object using the supplied LOINC code, display name, and integer value.
 * No validation is performed on the supplied number to ensure it's an integer.
 *
 * Note that this function will return null if the runtime value is null, undefined, or not a finite number.
 */
export const buildIntegerObservationComponent = (
  loinc: string,
  displayName: string,
  value: number,
) => buildObservationComponent(loinc, displayName, "valueInteger", value);

/**
 * Builds and returns FHIR Observation component object using the supplied LOINC code, display name, and Quantity value.
 *
 * Note that this function will return null if the supplied quantity is empty or its value field is not a finite number.
 */
export const buildQuantityObservationComponent = (
  loinc: string,
  displayName: string,
  quantity: fhir4.Quantity,
) => {
  if (!isFinite(quantity?.value)) {
    // don't build a component if the value field is missing or isn't finite
    return null;
  }

  return buildObservationComponent(
    loinc,
    displayName,
    "valueQuantity",
    quantity,
  );
};
