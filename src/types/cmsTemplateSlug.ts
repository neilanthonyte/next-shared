// TODO - use these constants where templateSlug is used later.

/**
 * available CMS template slug.
 */

export const TEMPLATE_APPOINTMENT_BOOKED = "appointment-booked";

export const TEMPLATE_POST_CONSULT = "post-consult";

export const TEMPLATE_TWO_FACTOR = "two-factor";

/**
 * @deprecated old template slug for patient medication action. Keeping this temporarily as
 * reference until we remove from the CMS.
 */
export const TEMPLATE_ACTION_REMINDER_ORIGINAL = "action-reminder";

export const TEMPLATE_ACTION_REMINDER = "medication-action-reminder";

export const TEMPLATE_NEW_INSTRUCTIONS = "new-instructions";

export const TEMPLATE_NEW_MEDICATION = "new-medication";

export const TEMPLATE_NEW_EDUCATION = "new-education";

export const TEMPLATE_NEW_LETTER = "new-letter";

export const TEMPLATE_NEW_LAB_RESULT = "new-lab-result";

export const TEMPLATE_PAYMENT_SUCCESS = "payment-success";

export const TEMPLATE_PAYMENT_FAILED = "payment-failed";

export const allTemplatesSlugs = [
  TEMPLATE_ACTION_REMINDER,
  TEMPLATE_APPOINTMENT_BOOKED,
  TEMPLATE_NEW_INSTRUCTIONS,
  TEMPLATE_NEW_MEDICATION,
  TEMPLATE_NEW_EDUCATION,
  TEMPLATE_NEW_LAB_RESULT,
  TEMPLATE_NEW_LETTER,
  TEMPLATE_PAYMENT_FAILED,
  TEMPLATE_PAYMENT_SUCCESS,
  TEMPLATE_POST_CONSULT,
  TEMPLATE_TWO_FACTOR,
] as const;

// utility types, may not be complete, so may not be the best to enforce unless we're sure.
// Because we will need to keep this in-sync with the website.
export type TTemplateSlug = typeof allTemplatesSlugs[number];
