import faker from "faker";
import { IExternalContactTelecom } from "../types/IExternalContactTelecom";

export const generateMockExternalContactTelecom = (
  overrides?: Partial<IExternalContactTelecom>,
): IExternalContactTelecom => {
  const mobilePhone =
    overrides?.mobilePhone !== undefined
      ? overrides.mobilePhone
      : faker.random.boolean()
      ? faker.phone.phoneNumber()
      : null;
  const homePhone =
    overrides?.homePhone !== undefined
      ? overrides.homePhone
      : faker.random.boolean()
      ? faker.phone.phoneNumber()
      : null;
  const workPhone =
    overrides?.workPhone !== undefined
      ? overrides.workPhone
      : faker.random.boolean()
      ? faker.phone.phoneNumber()
      : null;
  const email =
    overrides?.email !== undefined
      ? overrides.email
      : faker.random.boolean()
      ? faker.internet.email()
      : null;
  const fax =
    overrides?.fax !== undefined
      ? overrides.fax
      : faker.random.boolean()
      ? faker.phone.phoneNumber()
      : null;

  return {
    mobilePhone,
    homePhone,
    workPhone,
    email,
    fax,
    ...overrides,
  };
};
