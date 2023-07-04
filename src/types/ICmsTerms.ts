export interface ICmsTermsAndConditions {
  title: string;
  lead: string;
  version: string;
  sections: Array<{
    heading: string;
    body: string;
  }>;
}
