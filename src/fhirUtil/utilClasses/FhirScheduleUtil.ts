import { FhirResourceUtil } from "./FhirResourceUtil";

export interface IAppointmentDetails {
  lengthMinutes: number; // in minutes.
  name: string;
  externalId?: string;
}

export class FhirScheduleUtil<
  T extends fhir3.Schedule = fhir3.Schedule,
> extends FhirResourceUtil<T> {
  public getAppointmentTypes(): IAppointmentDetails[] {
    const appointmentExtensions = this.resource.extension
      .filter(
        (ex) =>
          ex.url ===
          "http://medicaldirector.com/Schedule/extension/Appointment-Type",
      )
      .map((aptExtension) => {
        const name = aptExtension.valueQuantity.extension.find(
          (ext) =>
            ext.url ===
            "http://medicaldirector.com/Appointment-Type/extension/Name",
        ).valueString;

        const externalId = aptExtension.valueQuantity.extension.find(
          (ext) =>
            ext.url ===
            "http://medicaldirector.com/Appointment-Type/extension/ExternalId",
        ).valueString;

        const lengthMinutes = aptExtension.valueQuantity.value;
        return {
          name,
          externalId,
          lengthMinutes,
        };
      });
    return appointmentExtensions;
  }
}
