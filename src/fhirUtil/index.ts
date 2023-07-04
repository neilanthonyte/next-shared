import { FhirBaseUtil } from "./utilClasses/FhirBaseUtil";
import { FhirResourceUtil } from "./utilClasses/FhirResourceUtil";
import { FhirPersonUtil } from "./utilClasses/FhirPersonUtil";
import { FhirPatientUtil } from "./utilClasses/FhirPatientUtil";
import { FhirAppointmentUtil } from "./utilClasses/FhirAppointmentUtil";
import { FhirMedicationRequestUtil } from "./utilClasses/FhirMedicationRequestUtil";
import { FhirObservationUtil } from "./utilClasses/FhirObservationUtil";
import { FhirGoalUtil } from "./utilClasses/FhirGoalUtil";
import { FhirScheduleUtil } from "./utilClasses/FhirScheduleUtil";

/* tslint:disable */
type fhirUtilClass = { new (resource: any): FhirBaseUtil };
/* tslint:enable */
const utilClassMap: { [key: string]: fhirUtilClass } = {
  schedule: FhirScheduleUtil,
  resource: FhirResourceUtil,
  patient: FhirPatientUtil,
  practitioner: FhirPersonUtil,
  appointment: FhirAppointmentUtil,
  medicationrequest: FhirMedicationRequestUtil,
  observation: FhirObservationUtil,
  goal: FhirGoalUtil,
};

export function fhirUtil<
  T extends FhirBaseUtil<F> = FhirResourceUtil<any>,
  F extends
    | fhir3.Resource
    | fhir3.Element
    | fhir4.Resource
    | fhir4.Element = fhir3.Resource,
>(fhirObj: F): T {
  if ("resourceType" in fhirObj && fhirObj.resourceType === undefined) {
    // if we dont have a resource, always return the base utils
    return new FhirBaseUtil(fhirObj) as T;
    // throw new Error("Object does not appear to be a valid fhir object: " + JSON.stringify(fhirObj));
  }
  const resourceType =
    "resourceType" in fhirObj && fhirObj.resourceType.toLowerCase();
  const Cls =
    resourceType in utilClassMap
      ? utilClassMap[resourceType]
      : FhirResourceUtil;

  const util = new Cls(fhirObj);
  return util as T;
}
