import { Hcp } from "../models/Hcp";
import { NextLocation } from "../models/NextLocation";
import { ICreditCard } from "./ICreditCard";

export interface IAppointmentWithDetails {
  appointment: fhir3.Appointment;
  hcp?: Hcp;
  location?: NextLocation;
  forms?: fhir3.Observation[];
  payment?: ICreditCard;
  token?: string;
}
