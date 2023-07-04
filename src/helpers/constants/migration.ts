// --Hub migration to IRIS--

// migration flag extension, indicating data copied from MD Hub
export const migratedHubDataExtensionUrl =
  "http://nextpracticehealth.com/extension/hub-migration";

// extension to capture old pre-IRIS migration review item GUIDs
export const migratedHubReviewItemId =
  "http://nextpracticehealth.com/identifier/hub-migration/review-item-id";

// extension to capture patients not yet signed up at time of Hub migration
export const migratedHubPatientNotSignedUp =
  "http://nextpracticehealth.com/extension/hub-migration/patient-without-account";

// extension to capture original Hub patient address element (before cleaning out null string values)
export const migratedHubPatientOriginalAddress =
  "http://nextpracticehealth.com/extension/hub-migration/original-patient-address";

// extension to capture original Hub patient AU profile identifier elements (Medicare, DVA, etc--before
// cleaning out null string values
export const migratedHubPatientOriginalAUIdenfitier =
  "http://nextpracticehealth.com/extension/hub-migration/original-patient-au-identifier";

// extension to capture original Hub patient meta element (before cleaning out for copy POST)
export const migratedHubPatientOriginalMeta =
  "http://nextpracticehealth.com/extension/hub-migration/original-patient-meta";

// extension to capture original Hub observation quantity element (before converting string values to integers)
export const migratedHubObservationOriginalQuantity =
  "http://nextpracticehealth.com/extension/hub-migration/original-observation-quantity";

// extension to capture original Hub observation quantity element (before converting string values to integers)
export const migratedHubObservationOriginalEffectiveDate =
  "http://nextpracticehealth.com/extension/hub-migration/original-observation-effective-date";

// extension to capture original Hub observation status (if extant)
export const migratedHubObservationOriginalStatus =
  "http://nextpracticehealth.com/extension/hub-migration/original-observation-status";
