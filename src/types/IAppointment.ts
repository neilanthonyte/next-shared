export interface IAppointment {
  /** The unique helix id for that appointment type, usually a string containing a number like: "2" */
  helixId?: string;
  /** What users should see */
  label: string;
  /** A brief description of the appointment, potentially appearing to the user */
  description: string;
  /**
   * The name of that appointment type in helix, usually maps to something like "Standard" or "Extended", etc.
   */
  helixLabel?: string;

  /**
   * common appointments can potentially share helix IDS, we use this to uniquely identify them.
   */
  slug?: string;

  defaultLength?: string;
  patientType?: "all" | "new" | "returning";
  visibility?: "public" | "private";
}
