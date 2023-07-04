import { IMobileDevice } from "./IMobileDevice";

// used for patching contact details
export interface IPartialContact {
  name?: string | null;
  emailAddress?: string | null;
  mobileNumber?: string | null;
}

export interface IContact {
  contactId: number;
  extRef: string;
  company: string;
  name: string | null;
  emailAddress: string | null;
  mobileNumber: string | null;
  oneSignalDevices: IMobileDevice[];
}
