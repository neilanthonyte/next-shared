/**
 * Primarily used to support system that has the
 * "old" EHR integrations. Where `ehrPatientIdAlt` is
 * used for the old EHR ID
 */
export interface IPatientEhrIds {
  ehrPatientId: string;
  ehrPatientIdAlt: string | null;
}
