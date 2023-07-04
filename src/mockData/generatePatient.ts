import { fhirUtil } from "../fhirUtil";
import { FhirPatientUtil } from "../fhirUtil/utilClasses/FhirPatientUtil";
import { createGuid } from "../helpers/guid";
import { Patient } from "../models/Patient";
import { generateFhirPatient } from "./generateFhirPatient";
import { mockPatients } from "./mockPatients";

export const generatePatient = async (fhirPatient?: fhir3.Patient) => {
  const _fhirPatient = fhirPatient || (await generateFhirPatient());
  const fhirPatientUtil = fhirUtil<FhirPatientUtil>(_fhirPatient);

  const patient = Patient.unserialize({
    patientId: `generated-patient-${createGuid(6)}`,
    fhir: _fhirPatient,
    email: fhirPatientUtil.getPrimaryEmail(),
    acceptedTerms: "1.0",
    hasAcceptedLatestTerms: true,
    // defaults
    staffAlerts: null,
    paydockCustomerId: null,
    subscriptions: [],
    dateSignedUpToApp: null,
    passwordHash: null,
    passwordResetToken: null,
    passwordResetTokenExpiry: null,
    twoFactorCode: null,
    twoFactorCodeExpiry: null,
    irisPatientId: null,
    ehrPatients: [],
    paymentInformationUpdatedAt: null,
    demographicInformationUpdatedAt: null,
    lastObservationAt: null,
    lastNotificationAt: null,
    tourLastSeenAt: null,
  });

  mockPatients.push(patient);

  return patient;
};
