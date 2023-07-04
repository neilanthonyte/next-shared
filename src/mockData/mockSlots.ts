import moment from "moment";
import * as _ from "lodash";

import { ISlotWithHcp } from "next-shared/src/types/ISlotWithHcp";

import { mockHcps } from "./mockHcps";
import { mockAppointmentTypeNoAvailabilitySlug } from "./mockAppointmentTypes";

const minimumInterval = 10;

const today = moment();
// round to nearest 5 minutes
today.add("minutes", minimumInterval - (today.minutes() % minimumInterval));

const tomorrow = today.clone().add(1, "day");
const nextMonth = today.clone().add(1, "month");

/**
 * Mock slots for today and tomorrow
 */
export const mockSlots: fhir3.Slot[] = [].concat(
  _.times(10, (i) => ({
    start: today
      .add(10 * i, "minutes")
      .utc()
      .format(),
    end: today
      .add(10 * (i + 1), "minutes")
      .utc()
      .format(),
    status: "free",
    schedule: {},
  })),
  _.times(10, (i) => ({
    start: tomorrow
      .add(10 * i, "minutes")
      .utc()
      .format(),
    end: tomorrow
      .add(10 * (i + 1), "minutes")
      .utc()
      .format(),
    status: "free",
    schedule: {},
  })),
  _.times(10, (i) => ({
    start: nextMonth
      .add(10 * i, "minutes")
      .utc()
      .format(),
    end: nextMonth
      .add(10 * (i + 1), "minutes")
      .utc()
      .format(),
    status: "free",
    schedule: {},
  })),
);

/**
 * Generate slots for all HCPs
 */
export const mockSlotsWithHcps: ISlotWithHcp[] = _.flatten(
  _.flatten(
    mockHcps.map((hcp) =>
      hcp.appointmentTypeSlugs.map((type) =>
        type === mockAppointmentTypeNoAvailabilitySlug
          ? []
          : mockSlots.map((s) => ({
              ...s,
              appointmentType: type,
              hcp: {
                npServicesId: hcp.npServicesId,
              },
            })),
      ),
    ),
  ),
);
