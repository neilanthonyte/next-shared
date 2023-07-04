import { ISchedule } from "../types/ISchedule";

export interface IFilteredSchedule {
  direct: ISchedule[];
  multi: ISchedule[];
}
/**
 * Filter out appointmentTypes from the schedule that are not equal to the appointmentTypes passed in.
 *
 * Returns schedules filtered down by the appointmentType,
 * and also segregates the multi practitioner type appointments.
 * TODO - tests!
 */
export const getFilteredSchedule = (
  schedule: ISchedule[],
  appointmentTypes: string[],
): IFilteredSchedule => {
  return schedule.reduce(
    (accum, event) => {
      if (event.type.toLowerCase() === "multi") {
        accum.multi.push(event);
      } else {
        /**
         * Remove inane schedules based on the given appointment type.
         * Note: This will keep the schedule if the appointment
         * type in the schedule is equal to the all appointments key.
         */
        if (appointmentTypes.includes(event.type.toLowerCase())) {
          accum.direct.push(event);
        }
      }
      return accum;
    },
    { multi: [], direct: [] },
  );
};
