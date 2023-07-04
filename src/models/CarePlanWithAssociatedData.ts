import { ValidateNested, IsOptional } from "class-validator";

import { CarePlan, ICarePlan } from "./CarePlan";
import { IWlhPatient, WlhPatient } from "../models/WlhPatient";
import { IWlhProvider, WlhProvider } from "../models/WlhProvider";

export interface ICarePlanWithAssociatedData {
  carePlan: ICarePlan;
  patient?: IWlhPatient;
  provider?: IWlhProvider;
}

/**
 * Class representing a care plan with Associated Data.
 * TODO - Move to `next-shared`.
 */
export class CarePlanWithAssociatedData {
  @ValidateNested()
  public carePlan: CarePlan;

  @ValidateNested()
  @IsOptional()
  public patient: WlhPatient;

  @ValidateNested()
  @IsOptional()
  public provider: WlhProvider;

  constructor(data: ICarePlanWithAssociatedData) {
    this.carePlan = new CarePlan(data.carePlan);
    this.patient = data.patient ? new WlhPatient(data.patient) : undefined;
    this.provider = data.provider ? new WlhProvider(data.provider) : undefined;
  }

  public serialize(): ICarePlanWithAssociatedData {
    return {
      carePlan: this.carePlan.serialize(),
      patient: this.patient?.serialize(),
      provider: this.provider?.serialize(),
    };
  }
}
