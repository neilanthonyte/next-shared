interface IHcp {
  hcp: {
    npServicesId: string;
  };
}

/**
 * This is our internal booking slot, which uses "string" for the appointment type instead of CodeableConcept
 */
interface IBookingSlot extends Omit<fhir3.Slot, "appointmentType"> {
  appointmentType: string;
}

export type ISlotWithHcp = IBookingSlot & IHcp;
