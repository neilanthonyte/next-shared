import { groupBy } from "lodash";
import { fhirUtil } from "../fhirUtil";
import { FhirResourceUtil } from "../fhirUtil/utilClasses/FhirResourceUtil";
import { MedicalResourceType, PatientMedicalResource } from "../types/types";

export const groupMedicalResources = (
  resources: PatientMedicalResource[],
  resourceTypes: MedicalResourceType[],
) => {
  // group by type
  const groupedResources = groupBy(resources, (x) =>
    fhirUtil<FhirResourceUtil>(x).getMedicalResourceType(),
  );

  // add empty arrays for an items that had no results
  resourceTypes.forEach((type) => {
    if (groupedResources[type] === undefined) {
      groupedResources[type] = [];
    }
  });

  return groupedResources;
};
