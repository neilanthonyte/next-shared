import moment from "moment";
import { fhirUtil } from "../fhirUtil";
import { FhirAppointmentUtil } from "../fhirUtil/utilClasses/FhirAppointmentUtil";

import { IAppointmentWithDetails } from "../types/IAppointmentWithDetails";

export interface IPatientAppointments {
  all: IAppointmentWithDetails[] | null;
  past: IAppointmentWithDetails[] | null;
  upcoming: IAppointmentWithDetails[] | null;
  todays: IAppointmentWithDetails[] | null;
}

export const groupPatientAppointmentsChronologically = (
  appointmentsWithDetails: IAppointmentWithDetails[],
): IPatientAppointments => {
  const now = moment();

  const all = appointmentsWithDetails.sort(
    (appt1, appt2) =>
      moment(appt2.appointment.start).unix() -
      moment(appt1.appointment.start).unix(),
  );

  const todays = all.filter((appt) =>
    moment(appt.appointment.end).isSame(now, "day"),
  );

  const upcoming = all.filter((appt) => {
    // if telehealth, keep in upcoming for the whole day
    const isTelehealth = fhirUtil<FhirAppointmentUtil>(
      appt.appointment,
    ).getTelehealthUrl();
    const momentAppointmentEnd = moment(appt.appointment.end);
    const telehealthToday =
      isTelehealth && momentAppointmentEnd.isSame(now, "day");
    const endInFuture = momentAppointmentEnd.isAfter(now);
    return telehealthToday || endInFuture;
  });

  const past = all
    .filter(
      (appt) =>
        !upcoming.some((appt2) => appt.appointment.id === appt2.appointment.id),
    )
    // for past appointments, we want desc reversed order, starting from most recent
    .sort(
      (appt1, appt2) =>
        moment(appt2.appointment.end).unix() -
        moment(appt1.appointment.end).unix(),
    );

  return {
    all,
    past,
    todays,
    upcoming,
  };
};
