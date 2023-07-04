// TODO This is living in next-shared so that it can be used by services to compare EHR/IRIS FHIR.
//      It can be removed once the emergency contact relationship types are consistent across both
//      systems. See https://nextpracticehealth.atlassian.net/browse/NW-1051

const OTHER_ID = 11;
const OTHER_STR = "Other";

const RELATIONSHIP_TYPES: ReadonlyArray<[number, string]> = [
  [1, "Mother"],
  [2, "Father"],
  [3, "Grandmother"],
  [4, "Grandfather"],
  [5, "Sister"],
  [6, "Brother"],
  [7, "Boyfriend"],
  [8, "Girlfriend"],
  [9, "Spouse"],
  [10, "Friend"],
  [OTHER_ID, OTHER_STR],
  [12, "Colleague"],
  [13, "Grandmother (Paternal)"],
  [14, "Grandmother (Maternal)"],
  [15, "Grandfather (Paternal)"],
  [16, "Grandfather (Maternal)"],
  [17, "Patient"],
  [18, "Provider"],
  [19, "Child"],
  [20, "Grand-Child"],
  [21, "Unknown"],
];

const relationshipTypeStrings: ReadonlyMap<number, string> = new Map(
  RELATIONSHIP_TYPES,
);

/**
 * Gets the relationship type text for the supplied Next EHR ID.
 * @param id the ID of the relationship type in Next EHR.
 * @returns the user-readable text describing the relationship type, or "Other" if the lookup fails
 */
export const getRelationshipTypeString = (id: number) => {
  return relationshipTypeStrings.get(id) ?? OTHER_STR;
};

const relationshipTypeIds: ReadonlyMap<string, number> = new Map(
  RELATIONSHIP_TYPES.map(([id, name]) => [name.toLowerCase(), id]),
);

/**
 * Gets the Next EHR relationship type ID for the supplied relationship type text.
 * @param name the user-readable text describing the relationship type
 * @returns the ID of the relationship type in Next EHR, or 11 (Other) if the lookup fails
 */
export const getRelationshipTypeId = (name: string) => {
  return relationshipTypeIds.get(name.toLowerCase()) ?? OTHER_ID;
};

/**
 * Gets the Next EHR relationship type text for the supplied octo text.
 * @param relationshipText the original relationship text
 * @returns the text that the Next EHR will use.
 */
export const getNextEhrRelationshipText = (relationshipText: string) => {
  return getRelationshipTypeString(getRelationshipTypeId(relationshipText));
};
