export interface IAppointmentBookingDetails {
  start: number; // unix timestamp
  end: number; // unix timestamp

  practitionerId: string; // next id
  patient: fhir3.Patient; // partial patient

  locationEhrId: string; // hub id
  extension: fhir3.Extension[];
}
