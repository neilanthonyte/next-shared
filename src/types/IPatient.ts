export interface IPatient {
  id: string; // helix id
  birthDate: string;
  gender: "male" | "female";
  name: Array<{
    family: string;
    given: string;
    text: string;
  }>;
}
