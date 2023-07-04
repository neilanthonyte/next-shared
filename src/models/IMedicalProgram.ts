export interface IMedicalProgram {
  /** Name of the program template */
  name: string;
  goals: fhir3.Goal[];
  articles: string[]; // slugs
}
