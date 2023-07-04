export interface IReviewableObservation {
  onAccept?: (obsIds: string[]) => Promise<void>;
  onReject?: (obsIds: string[]) => Promise<void>;
  onTranscribe?: (
    observations: fhir3.Observation[],
    ehrAppointmentId?: string,
  ) => Promise<void>;
}
