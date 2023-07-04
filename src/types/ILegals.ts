export type htmlString = string;

export interface ILegalsSection {
  heading: string;
  body: htmlString;
}

export interface ILegalsInterface {
  lead: htmlString;
  sections: ILegalsSection[];
}
