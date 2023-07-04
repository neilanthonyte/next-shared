import { ICmsTermsAndConditions } from "./ICmsTerms";

export interface ILegalsModule {
  retrieveTermsAndConditions(): Promise<ICmsTermsAndConditions>;
}
