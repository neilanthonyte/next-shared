export interface ISchedule {
  start: string; // unix timestamp would be better, but given fhir3.Appointment and fhir3.Slot are string datetimes.
  end: string;
  type: string; // standard | extended, etc.
}
