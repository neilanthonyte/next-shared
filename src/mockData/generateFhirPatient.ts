import moment from "moment";
import * as _ from "lodash";
import axios from "axios";
import { toUnformattedInternational } from "../helpers/phoneNumberHelpers";

// TODO move somewhere more common
export const generateFhirPatient = async (
  email: string = "dev.team@nextpracticehealth.com",
  phone: string = "0491570006", // fake number, taken from here: https://www.acma.gov.au/choose-your-phone-number
): Promise<fhir3.Patient> => {
  let response;
  try {
    response = await axios.get("https://randomuser.me/api/?nat=au&noinfo");
  } catch (e) {
    console.warn("unable to generate random user at this time");
    return;
  }
  const user = response.data.results[0];
  const name = `${user.name.first}-${user.name.last}`.toLowerCase();

  email = email.replace("@", `+${name}@`);
  phone = toUnformattedInternational(phone);

  return {
    resourceType: "Patient",
    gender: user.gender,
    birthDate: moment(user.dob.date).format("YYYY-MM-DD"),
    telecom: [
      {
        system: "phone",
        value: phone,
        use: "mobile",
      },
      {
        system: "email",
        value: email,
      },
    ],
    name: [
      {
        family: _.capitalize(user.name.last),
        given: [_.capitalize(user.name.first)],
        prefix: [_.capitalize(user.name.title)],
      },
    ],
    // @ts-ignore
    _meta: {
      acceptedTerms: true,
      optInSMS: true,
    },
  };
};
