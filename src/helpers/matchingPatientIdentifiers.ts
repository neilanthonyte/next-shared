import moment from "moment";

/**
 * Helper function returning whether the two given fhir Patients have matching identifiers
 * identifiers = family name, given name, dob
 */
export const matchingPatientIdentifiers = (
  fhirPatient1: fhir3.Patient,
  fhirPatient2: fhir3.Patient,
): boolean => {
  const getPatientIdentifiers = (p: fhir3.Patient) => {
    return {
      familyNames: p.name.map((name) => name.family),
      givenNames: p.name.reduce((acc, name) => {
        return acc.concat(name.given);
      }, []),
      dob: moment(p.birthDate).unix(),
    };
  };

  const {
    familyNames: fn1,
    givenNames: gn1,
    dob: dob1,
  } = getPatientIdentifiers(fhirPatient1);
  const {
    familyNames: fn2,
    givenNames: gn2,
    dob: dob2,
  } = getPatientIdentifiers(fhirPatient2);

  return (
    fn1.some((n) => fn2.includes(n)) &&
    gn1.some((n) => gn2.includes(n)) &&
    dob1 === dob2
  );
};
