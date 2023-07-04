// TODO sort out a folder/file structure for the different types of constants

export * from "./helix";
export * from "./migration";
export * from "./fhir";
export * from "./np";
export * from "./regexTemplate";

/**
 * quarterly period labels
 */
export const periods = ["Next 15", "15-30", "30-45", "45-60"];

/**
 * menu categories
 * TODO: check if we don't have to hard code this
 */
export const categories: { [category: string]: string } = {
  mains: "green",
  sides: "red",
  drinks: "blue",
  alcohol: "brown",
};

/**
 * bump route paths
 */
export enum BumpPaths {
  Upcoming = "upcoming",
  Preparing = "preparing",
  Assembling = "assembling",
  Ready = "ready",
  PastOrders = "pastOrders",
}

/**
 * order states
 */
export enum OrderStates {
  Current = "current",
  Other = "other",
  Ready = "ready",
}

/**
 * hot products
 */
export const hots = [
  "Chicken",
  "Mex Chicken",
  "Barbacoa Beef",
  "Pulled Pork",
  "Lamb",
  "Cauliflower",
  "White Rice",
  "Black Rice",
  "Pinto Beans",
  "Fried Chicken Breast",
];

/**
 * cold products
 */
export const colds = [
  "Sour Cream",
  "Tomato Salsa",
  "Guacamole",
  "Vegan Cheese",
  "Apple Coleslaw",
];

export const defaultCharset = "abcdefghijklmnopqrstuvwxyz0123456789";

export const isoDateFormat = "YYYY-MM-DD";

export const daysOfWeekMap = [
  [1, "Monday"],
  [2, "Tuesday"],
  [3, "Wednesday"],
  [4, "Thursday"],
  [5, "Friday"],
  [6, "Saturday"],
  [0, "Sunday"],
];

export const defaultReasonForVisitFormSlug = "default-reason-for-visit";

export const loincOrgURI = "http://loinc.org/";

export const unitsOfMeasureOrgURI = "http://unitsofmeasure.org/";

export const snomedInfoURI = "http://snomed.info/sct";

// --images--
export const appStoreBadge =
  "https://dph95f73vdxmz.cloudfront.net/uploads/app-store.png";
export const googlePlayBadge =
  "https://dph95f73vdxmz.cloudfront.net/uploads/google-play.png";

// a through z, 0 through 9
export const appAccessCodePossibleCharacters =
  "abcdefghijklmnopqrstuvwxyz0123456789";

/**
 * @see src/fhirUtil/fhirObservations/metricDefinitions/reasonForVisit.ts
 */
export const appointmentFormPatientNoteLOINC = "51855-5";
