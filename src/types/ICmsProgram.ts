export interface ICmsProgram {
  name: string;
  goals: fhir3.Goal[][];
  articleSlugs: Array<{
    slug: string;
  }>;
}
