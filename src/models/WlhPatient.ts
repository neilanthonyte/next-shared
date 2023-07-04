import { IsString } from "class-validator";
import { IWlhPerson, WlhPerson } from "./WlhPerson";

export interface IWlhPatient extends IWlhPerson {
  patientId: string;
}

/**
 * Represents a patient from Hive Database.
 *
 * @class WlhPatient
 * @extends WlhPerson
 * @implements IWlhPatient
 *
 * @property {string} patientId - The ID of the patient
 *
 * @param {IWlhPatient} data - Data used to create a new WlhPatient instance
 *
 * @method serialize - Serializes the instance into an object of type IWlhPatient
 *
 */
export class WlhPatient extends WlhPerson {
  @IsString()
  patientId: string;

  constructor(data?: IWlhPatient) {
    super(data);
    this.patientId = data?.patientId ?? "";
  }

  /**
   * Serialize schema for model
   * @return {IWlhPatient}
   */
  public serialize(): IWlhPatient {
    return { ...super.serialize(), patientId: this.patientId };
  }
}
