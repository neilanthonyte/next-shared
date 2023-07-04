import * as _ from "lodash";

import { IPatientDataSectionWithStatus } from "../types/IPatientDataSection";
import { defaultPatientDataSections } from "./defaultPatientDataSections";

/**
 * Helper function scanning two given fhir Patient and returning available patient data section with state
 */
export const getPatientDataSectionsUpdates = (
  ehrFhirPatient: fhir3.Patient,
  nextFhirPatient: fhir3.Patient,
): IPatientDataSectionWithStatus[] =>
  defaultPatientDataSections.map(({ name, maps }) => {
    const fieldsHaveDifferences: boolean[] = maps.map((dataMap) => {
      const [path, filters] =
        typeof dataMap === "string"
          ? [dataMap, undefined]
          : [dataMap.map, dataMap.filters];

      let ehrField = _.get(ehrFhirPatient, path);
      let nextField = _.get(nextFhirPatient, path);

      if (filters) {
        const findByFilter = (f: any) =>
          filters.some((filter) => f[filter.key] === filter.value);

        ehrField = ehrField ? ehrField.find(findByFilter) : null;
        nextField = nextField ? nextField.find(findByFilter) : null;
      }
      // there's a difference if there's a value in our system and it doesn't equal EHR data
      return !!nextField && !_.isEqual(ehrField, nextField);
    });

    return {
      name,
      status: fieldsHaveDifferences.some((s) => s) ? "updated" : "matching",
    };
  });
