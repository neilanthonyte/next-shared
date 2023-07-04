import { fhirUtil } from "next-shared/src/fhirUtil";
import { AppointmentType } from "next-shared/src/models/AppointmentType";
import { NextLocation } from "next-shared/src/models/NextLocation";
import { FhirObservationUtil } from "../fhirUtil/utilClasses/FhirObservationUtil";

import { defaultReasonForVisitFormSlug } from "./constants";

interface IGetReasonForVisitFormSlug {
  appointmentType?: AppointmentType;
  location?: NextLocation;
  form?: fhir3.Observation;
}

/**
 * Helper function returning the slug of the reason for visit form associated to an appointment
 * Shared logic between backend and frontend (which needs to create an empty observation placeholder if no form was filled during booking)
 */
export const getReasonForVisitFormSlug = ({
  appointmentType,
  location,
  form,
}: IGetReasonForVisitFormSlug): string => {
  const formSlug = form
    ? fhirUtil<FhirObservationUtil>(form).getObservationFormSlug()
    : null;
  const appointmentTypeFormSlug = appointmentType?.reasonForVisitForm;
  const locationFormSlug = location?.formSlugs?.reasonForVisit;

  // order:
  // 1. observation form slug extension
  // 2. CMS appointment type reason for visit form slug
  // 3. CMS location reason for visit form slug
  // 4. fallback default reason form visit in CMS Globals Forms default-reason-for-visit
  return (
    formSlug ||
    appointmentTypeFormSlug ||
    locationFormSlug ||
    defaultReasonForVisitFormSlug
  );
};
