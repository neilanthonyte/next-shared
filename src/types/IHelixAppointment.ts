/*
{
    CentreId: 1, // hack: assume first center for each helix site
    WorkAreaId: 1, // hack: gp work area for each helix site
    HcpUserId: practitioner.ehrHelixId,
    HcpUserDisplayName: practitioner.getDisplayName(),
    StartDateTime: unixTimestampToISODate(start), // "2020-04-20T11:25:00Z",
    EndDateTime: unixTimestampToISODate(end), // "2020-04-20T11:35:00Z",
    // "VisitType": 0,
    AppointmentType: {
      Id: helixAppointmentTypeId
    },
    AppointmentStatus: 1, // booked?
    Notes: appointmentNote,
    Patient: {
      PatientId: patient.ehrHelixId,
      Title: _.get(patient.fhir, "name[0].prefix[0]", ""),
      GivenNames: _.get(patient.fhir, "name[0].given[0]", ""),
      Surname: patient.fhir.name[0].family,
      DateOfBirth: patient.fhir.birthDate + "T00:00:00", // "1991-05-26T00:00:00",
      Status: parseInt(
        fhirUtil<FhirPatientUtil>(patient.fhir).getExtensionStringValue(
          "http://medicaldirector.com/Patient/extension/Status"
        ),
        10
      ) // 2,
    }
  };
 */

export interface IHelixAppointment {
  Id?: number;
  CentreId: number;
  WorkAreaId: number;
  HcpUserId: number; // helix user id
  // HcpUserDisplayName?: string, // helix practitioner name
  StartDateTime: string; // "2020-04-20T11:25:00+10:00",
  EndDateTime: string; // "2020-04-20T11:35:00+10:00",
  AppointmentType: {
    Id: number; // helix appointment type ID
    Description?: string;
  };
  AppointmentStatus: number;
  Notes: string;
  TelehealthContactMethod?: number; // 1 = don't automatically contact
  TelehealthUrl: string;
  Patient: {
    PatientId: number; // patient ehr id
    Title: string;
    GivenNames: string;
    Surname: string;
    DateOfBirth: string; // "1991-05-26T00:00:00",
    Status: 1 | 2; // patient status
  };
}
