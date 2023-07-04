import { v4 as uuidv4 } from "uuid";
import faker from "faker";
import { IExternalContactAddress } from "../types/IExternalContactAddress";

export const generateMockExternalContactAddress = (
  overrides?: Partial<IExternalContactAddress>,
): IExternalContactAddress => {
  const addressId = overrides?.addressId || uuidv4();
  const line1 = overrides?.line1 || faker.address.streetAddress();
  const line2 = overrides?.line2 || faker.address.secondaryAddress();
  const city = overrides?.city || faker.address.city();
  const zip = overrides?.zip || faker.address.zipCode();
  const stateId = overrides?.stateId || faker.datatype.number();
  const stateAbbr = overrides?.stateAbbr || faker.address.stateAbbr();
  const countryId = overrides?.countryId || faker.datatype.number();
  const countryCode = overrides?.countryCode || faker.address.countryCode();
  const latitude = overrides?.latitude || parseFloat(faker.address.latitude());
  const longitude =
    overrides?.longitude || parseFloat(faker.address.longitude());
  const timezoneId = overrides?.timezoneId || faker.address.timeZone();

  return {
    addressId,
    line1,
    line2,
    city,
    zip,
    stateId,
    stateAbbr,
    countryId,
    countryCode,
    latitude,
    longitude,
    timezoneId,
    ...overrides,
  };
};
