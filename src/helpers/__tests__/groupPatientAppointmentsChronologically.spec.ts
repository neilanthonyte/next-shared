import { cloneDeep } from "lodash";
import moment from "moment";
import * as uuid from "uuid";

import { mockAppointmentsWithDetails } from "../../mockData/mockAppointments";
import { groupPatientAppointmentsChronologically } from "../groupPatientAppointmentsChronologically";

test("group appointments chronologically", () => {
  const appointment = mockAppointmentsWithDetails[0];

  // use start of day in case test is run at midnight and potentially fail
  const momentStartOfDay = moment().clone().startOf("day");
  const momentLaterToday = momentStartOfDay.clone().add(2, "hours");
  const momentStartFuture = momentStartOfDay.clone().add(2, "days");
  const momentStartPast = momentStartOfDay.clone().subtract(2, "weeks");

  const todaysAppointmentNotPast = cloneDeep(appointment);
  todaysAppointmentNotPast.appointment.id = uuid.v4();
  todaysAppointmentNotPast.appointment.start = momentLaterToday.toISOString();
  todaysAppointmentNotPast.appointment.end = momentLaterToday
    .add(15, "minutes")
    .toISOString();

  const todaysAppointmentPast = cloneDeep(todaysAppointmentNotPast);
  todaysAppointmentPast.appointment.id = uuid.v4();
  todaysAppointmentPast.appointment.start = momentStartOfDay.toISOString();
  todaysAppointmentPast.appointment.end = momentStartOfDay
    .add(15, "minutes")
    .toISOString();

  const pastAppointment = cloneDeep(appointment);
  pastAppointment.appointment.id = uuid.v4();
  pastAppointment.appointment.start = momentStartPast.toISOString();
  pastAppointment.appointment.end = momentStartPast
    .add(15, "minutes")
    .toISOString();

  const futureAppointment = cloneDeep(appointment);
  futureAppointment.appointment.id = uuid.v4();
  futureAppointment.appointment.start = momentStartFuture.toISOString();
  futureAppointment.appointment.end = momentStartFuture
    .add(15, "minutes")
    .toISOString();

  const testAppoinmtents = [
    todaysAppointmentNotPast,
    todaysAppointmentPast,
    pastAppointment,
    futureAppointment,
  ];

  const groupedAppointments =
    groupPatientAppointmentsChronologically(testAppoinmtents);

  expect(groupedAppointments.all).toEqual(testAppoinmtents);
  expect(groupedAppointments.past).toContainEqual(pastAppointment);
  expect(groupedAppointments.todays.length).toEqual(2);
  expect(groupedAppointments.todays).toEqual([
    todaysAppointmentNotPast,
    todaysAppointmentPast,
  ]);
  expect(groupedAppointments.upcoming).toContainEqual(futureAppointment);
});
