import { IGeo } from "./IGeo";

export interface ILocationAddress extends IGeo {
  fullAddress: string;
  country: string;
  streetAddress?: string;
  suburb?: string;
  state?: string;
  postcode?: string;
}
