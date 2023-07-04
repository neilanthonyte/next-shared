import {
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from "class-validator";

import { unixTimestamp } from "../types/dateTypes";
import {
  CarePlanInterventionSnapshot,
  ICarePlanInterventionSnapshot,
} from "./CarePlanInterventionSnapshot";
import { CarePlanTeamMember, ICarePlanTeamMember } from "./CarePlanTeamMember";
import {
  CarePlanSnapshotData,
  ICarePlanSnapshotData,
} from "./CarePlanSnapshotData";
import {
  CarePlanLifestyleSnapshot,
  ICarePlanLifestyleSnapshot,
} from "./CarePlanLifestyleSnapshot";
import {
  CarePlanMedicationSnapshot,
  ICarePlanMedicationSnapshot,
} from "./CarePlanMedicationSnapshot";
import {
  PersistableModel,
  ISerializedPersistableModel,
} from "./PersistableModel";

export enum ECarePlanTypes {
  GPMP = "GPMP",
  TCA = "TCA",
  GPMPAndTCA = "GPMPAndTCA",
}

export enum ECarePlanStatus {
  Draft = "draft",
  Initial = "initial",
  Review = "review",
}

export interface ICarePlan extends ISerializedPersistableModel {
  // ID of the care plan, can be null
  carePlanId?: string | null;
  // ID of the patient
  patientId: string;
  // ID of the provider
  providerId: string;
  // Clinic Location ID of provider
  clinicLocationId: string;
  // Title of the care plan
  title?: string | null;
  // Type of the care plan
  type: ECarePlanTypes;
  // Date when the care plan was finalized, can be null. This determines the care plan status.
  finalisedAt?: unixTimestamp | null;
  // ID of the parent care plan, can be null
  // parent care plan is the one from which this care plan is cloned
  parentCarePlanId?: string | null;
  /**
   * ID of the root care plan, can be null
   * Root care plan is the initial care plan from which a series of care plans are cloned.
   * For example: carePlanA --> carePlanB --> carePlanC
   * For carePlanC:
   *   - Parent is carePlanB
   *   - Root is carePlanA
   *
   */
  rootCarePlanId?: string | null;
  // Medical Notes for the care plan, can be null
  notes?: string | null;
  // Version of the CDM editor
  carePlanModuleVersion?: string;
  // ID of the author who initialized the care plan
  authorUserId?: string;
  // ID of the user who finalized the care plan, should be null if it's not finalised
  finalisedByUserId?: string | null;

  // An array of interventions for the care plan
  interventions?: ICarePlanInterventionSnapshot[];
  // An array of team members associated with the care plan
  teamMembers?: ICarePlanTeamMember[];
  // An array of observations for the care plan
  observations?: ICarePlanSnapshotData[];
  // An array of medications for the care plan
  medications?: ICarePlanMedicationSnapshot[];
  // An array of lifestyle factors for the care plan
  lifestyleFactors?: ICarePlanLifestyleSnapshot[];
  deletedAt?: unixTimestamp;
}

/**
 * Class representing a care plan.
 */
export class CarePlan extends PersistableModel {
  @IsOptional()
  @IsString()
  carePlanId: string | null;

  @IsString()
  patientId: string;

  @IsString()
  providerId: string;

  @IsString()
  clinicLocationId: string;

  @IsString()
  @IsOptional()
  title: string;

  @IsString()
  type: ECarePlanTypes;

  @IsOptional()
  @IsNumber()
  finalisedAt: unixTimestamp | null;

  @IsOptional()
  @IsString()
  parentCarePlanId: string | null;

  @IsOptional()
  @IsString()
  rootCarePlanId: string | null;

  @IsOptional()
  @IsString()
  notes: string | null;

  @IsString()
  @IsOptional()
  carePlanModuleVersion: string;

  @IsString()
  @IsOptional()
  authorUserId: string;

  @IsString()
  @IsOptional()
  finalisedByUserId: string;

  @ValidateNested()
  @IsOptional()
  interventions: CarePlanInterventionSnapshot[];

  @ValidateNested()
  @IsOptional()
  teamMembers: CarePlanTeamMember[];

  @ValidateNested()
  @IsOptional()
  observations: CarePlanSnapshotData[];

  @ValidateNested()
  @IsOptional()
  medications: CarePlanMedicationSnapshot[];

  // TODO - consider adding @IsArray(), will not make this current work larger than it already is
  @ValidateNested()
  @IsOptional()
  lifestyleFactors: CarePlanLifestyleSnapshot[];

  @IsOptional()
  deletedAt: unixTimestamp;

  constructor(data: ICarePlan) {
    super(data);

    // Mandatory fields to create a CarePlan
    this.patientId = data.patientId;
    this.providerId = data.providerId;
    this.clinicLocationId = data.clinicLocationId;
    this.type = data.type;

    // Optional fields for a CarePlan
    this.carePlanId = data.carePlanId || null;
    this.title = data.title || null;
    this.finalisedAt = data.finalisedAt || null;
    this.parentCarePlanId = data.parentCarePlanId || null;
    this.rootCarePlanId = data.rootCarePlanId || null;
    this.notes = data.notes || null;
    this.carePlanModuleVersion = data.carePlanModuleVersion;
    this.authorUserId = data.authorUserId;
    this.finalisedByUserId = data.finalisedByUserId || null;

    this.interventions =
      data.interventions?.map(
        (intervention) => new CarePlanInterventionSnapshot(intervention),
      ) || [];

    this.teamMembers =
      data.teamMembers?.map(
        (teamMember) => new CarePlanTeamMember(teamMember),
      ) || [];

    this.observations =
      data.observations?.map(
        (observation) => new CarePlanSnapshotData(observation),
      ) || [];
    this.medications =
      data.medications?.map(
        (medication) => new CarePlanMedicationSnapshot(medication),
      ) || [];
    this.lifestyleFactors =
      data.lifestyleFactors?.map(
        (lifestyleFactor) => new CarePlanLifestyleSnapshot(lifestyleFactor),
      ) || [];
  }

  public serialize(): ICarePlan {
    return {
      ...super.serialize(),
      carePlanId: this.carePlanId,
      patientId: this.patientId,
      providerId: this.providerId,
      clinicLocationId: this.clinicLocationId,
      title: this.title,
      type: this.type,
      finalisedAt: this.finalisedAt,
      parentCarePlanId: this.parentCarePlanId,
      rootCarePlanId: this.rootCarePlanId,
      notes: this.notes,
      carePlanModuleVersion: this.carePlanModuleVersion,
      authorUserId: this.authorUserId,
      finalisedByUserId: this.finalisedByUserId,

      interventions: this.interventions.map((intervention) =>
        intervention.serialize(),
      ),
      teamMembers: this.teamMembers.map((teamMember) => teamMember.serialize()),
      observations: this.observations.map((observation) =>
        observation.serialize(),
      ),
      medications: this.medications.map((medication) => medication.serialize()),
      lifestyleFactors: this.lifestyleFactors.map((lifestyleFactor) =>
        lifestyleFactor.serialize(),
      ),
      deletedAt: this.deletedAt,
    };
  }

  public get status(): ECarePlanStatus {
    if (!this.finalisedAt) return ECarePlanStatus.Draft;
    if (!this.rootCarePlanId) return ECarePlanStatus.Initial;
    return ECarePlanStatus.Review;
  }
}
