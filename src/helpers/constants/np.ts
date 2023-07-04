// --services--
export const cancellationTokenExtensionUrl =
  "http://nextpracticehealth.com/extension/appointment/cancellation-token";

export const reviewItemExtensionUrl =
  "http://nextpracticehealth.com/extension/is-review-item";

export const reviewItemReviewedExtensionUrl =
  "http://nextpracticehealth.com/extension/reviewed-item";

export const reviewedItemPerformerExtensionUrl =
  "http://nextpracticehealth.com/extension/review-performer";

export const reviewedItemStatusExtensionUrl =
  "http://nextpracticehealth.com/extension/review-status";

export const reviewedItemDateExtensionUrl =
  "http://nextpracticehealth.com/extension/review-date";

export const rejectedReviewItemForAllExtensionUrl =
  "http://nextpracticehealth.com/extension/rejected-review-item/all";

export const outOfDateExtensionUrl =
  "http://nextpracticehealth.com/extension/is-out-of-date";

export const observationTypeExtensionUrl =
  "http://nextpracticehealth.com/extension/observation/medical-resource-type";

export const observationDisplayNameExtensionUrl =
  "http://nextpracticehealth.com/extension/observation/display-name";

export const observationComponentRawCodeExtensionUrl =
  "http://nextpracticehealth.com/extension/observation/component-raw-code";

export const observationComponentDisplayNameExtensionUrl =
  "http://nextpracticehealth.com/extension/observation/component-display-name";

export const observationFormSlugExtensionUrl =
  "http://nextpracticehealth.com/extension/observation/form-slug";

export const observationFormSchemaExtensionUrl =
  "http://nextpracticehealth.com/extension/observation/form-schema";

export const medicationReasonForCessationExtensionUrl =
  "http://nextpracticehealth.com/extension/medication/reason-for-cessation";

export const medicationFormExtensionUrl =
  "http://nextpracticehealth.com/extension/medication/form";

export const medicationStrengthExtensionUrl =
  "http://nextpracticehealth.com/extension/medication/strength";

export const telehealthUrlExtensionUrl =
  "http://nextpracticehealth.com/extension/appointment/telehealth-url";

export const appointmentPatientQuestionnaireMetadataExtensionUrl =
  "http://nextpracticehealth.com/extension/appointment/patient-questionnaire";

export const appointmentPrepaymentExtensionUrl =
  "http://nextpracticehealth.com/extension/appointment/pre-payment";

export const appointmentCostExtensionUrl =
  "http://nextpracticehealth.com/extension/appointment/cost";

export const originEhrIdExtensionUrl =
  "http://nextpracticehealth.com/extension/origin-ehr-id";

export const originLocationSlugExtensionUrl =
  "http://nextpracticehealth.com/extension/origin-location-slug";

export const originEhrResourceIdExtensionUrl =
  "http://nextpracticehealth.com/extension/origin-ehr-resource-id";

export const originEhrResourceAltExtensionUrl =
  "http://nextpracticehealth.com/extension/origin-ehr-resource-alt-id";

export const nextPatientIdIdentifierUrl =
  "http://nextpracticehealth.com/identifier/next-patient-id";

export const multiHCPDetailsURL =
  "http://nextpracticehealth.com/extension/appointment/mulit-hcp-details";

export const nextAppointmentTypeSlug =
  "http://nextpracticehealth.com/extension/appointment/slug";

export const nextAppointmentTypeLabel =
  "http://nextpracticehealth.com/extension/appointment/label";

export const imageDeviceTypeExtentionUrl =
  "http://nextpracticehealth.com/extension/device-type";

export const slotMedicalStaffMemberId =
  "http://nextpracticehealth.com/extension/slot-medical-staff-member-id";

export const slotMedicalStaffMemberName =
  "http://nextpracticehealth.com/extension/slot-medical-staff-member-name";

export const slotMedicalStaffMemberSlug =
  "http://nextpracticehealth.com/extension/slot-medical-staff-member-slug";

export const appointmentCmsLocationId =
  "http://nextpracticehealth.com/extension/appointment-cms-location-id";

export const appointmentCmsLocationSlug =
  "http://nextpracticehealth.com/extension/appointment-cms-location-slug";

export const appointmentPaymentsExtensionUrl =
  "http://nextpracticehealth.com/extension/appointment/payments";

export const patientLastRecordUpdateUrl =
  "http://nextpracticehealth.com/extension/patient/lastRecordUpdate";

export const patientLastRecordSyncUrl =
  "http://nextpracticehealth.com/extension/patient/lastRecordSync";

export const patientLastDemographicUpdateUrl =
  "http://nextpracticehealth.com/extension/patient/last-record-update/demographic";

export const patientLastMedicalDataUpdateUrl =
  "http://nextpracticehealth.com/extension/patient/last-record-update/medical-data";

export const patientLastPaymentMethodUpdateUrl =
  "http://nextpracticehealth.com/extension/patient/last-record-update/payment-method";

export const patientStoreOriginExtensionUrl =
  "http://nextpracticehealth.com/extension/source-is-next-patient-store";

// --next-connect--
export const connectIdentifierTenantId =
  "http://connect.nextpracticeclinics.com/fhir/CodeSystem/tenant-id";

export const connectIdentifierEhrId =
  "http://connect.nextpracticeclinics.com/fhir/CodeSystem/ehr-id";

export const connectIdentifierEhrIdAlt =
  "http://connect.nextpracticeclinics.com/fhir/CodeSystem/ehr-id-alt";

export const extensionPatientMedicareCardNumber =
  "http://connect.nextpracticeclinics.com/fhir/Patient/medicare-card-number";

export const extensionPatientMedicareIrn =
  "http://connect.nextpracticeclinics.com/fhir/Patient/medicare-irn";

export const extensionPatientIsOptInSms =
  "http://connect.nextpracticeclinics.com/fhir/Patient/opt-in-sms";

export const observationDeviceTypeName =
  "http://nextpracticehealth.com/extension/device-type";

export const relationshipCodingSystem =
  "http://nextpracticehealth.com/fhir/CodeSystem/relationship-type";

// --'Private' extension URLs--
// TODO: Can we get rid of these when Hub goes (and the idea of 'private' extensions generally)? Where these are needed, they
// can then just be normal URIs (no /private/ path indicator, no related filtering, etc).
export const privateExtensionNamespace =
  "http://nextpracticehealth.com/extension/private/";

export const patientReviewItemsExtensionUrl =
  "http://nextpracticehealth.com/extension/private/patient/review-items";

export const patientGoalsExtensionUrl =
  "http://nextpracticehealth.com/extension/private/patient/goals";

export const tourLastSeenExtensionUrl =
  "http://nextpracticehealth.com/extension/private/patient/tour-last-seen";

export const medicationRemindersExtensionUrl =
  "http://nextpracticehealth.com/extension/private/patient/medication-reminders";

export const releasedResultsExtensionUrl =
  "http://nextpracticehealth.com/extension/private/patient/released";

export type releasedResultsExtensionUrl = typeof releasedResultsExtensionUrl;

// LEGACY - extension to capture prescribed education article slug
export const patientPrescribedEducationUri =
  "http://nextpracticehealth.com/extension/private/patient/prescribed-education";

/**
 * @deprecated LEGACY - extension to capture patient released letter ids
 * Keeping this for reference. But released letter is stored in
 * releasedResultsExtensionUrl
 */
export const patientReleasedLettersUri =
  "http://nextpracticehealth.com/extension/private/patient/released-letters";

export const npAppointmentTypeReasonSystem =
  "http://nextpracticehealth.com/fhir/CodeSystem/appointment-reason";

export const npAppointmentCategorySystem =
  "http://nextpracticehealth.com/fhir/CodeSystem/appointment-category";

export const npAppointmentCategoriesExtensionUrl =
  "http://nextpracticehealth.com/extension/appointment-categories";

export const npAppointmentCategoryExtensionUrl =
  "http://nextpracticehealth.com/extension/appointment-category";

export const npConnectAppointmentTypeSystem =
  "http://nextpracticehealth.com/fhir/CodeSystem/connect-appointment-type";
