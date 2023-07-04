import { IsBoolean, IsString } from "class-validator";
import {
  PersistableModel,
  ISerializedPersistableModel,
} from "./PersistableModel";

export interface ICarePlanInterventionRole extends ISerializedPersistableModel {
  roleId: string;
  roleName: string;
  isAlliedHealth: boolean;
}

/**
 * Represents a care plan intervention role.
 * @class CarePlanInterventionRole
 *
 * @property {string} roleId - The ID of the role
 * @property {string} roleName - The name of the role
 * @property {boolean} isAlliedHealth - Whether the role is an allied health professional or not
 *
 * @param {ICarePlanInterventionRole} data - Data used to create a new CarePlanInterventionRole instance
 *
 * @method serialize() - Serializes the instance into an object of type ICarePlanInterventionRole
 *
 * @example
 * const role = new CarePlanInterventionRole({
 *   roleId: '8cecf383-e1f9-49d1-b801-6fe66df15ba1',
 *   roleName: 'Cardiologist',
 *   isAlliedHealth: true
 * });
 */
export class CarePlanInterventionRole extends PersistableModel {
  @IsString()
  roleId: string;

  @IsString()
  roleName: string;

  @IsBoolean()
  isAlliedHealth: boolean;

  constructor(data: ICarePlanInterventionRole) {
    super(data);
    this.roleId = data.roleId;
    this.roleName = data.roleName;
    this.isAlliedHealth = data.isAlliedHealth;
  }

  public serialize(): ICarePlanInterventionRole {
    return {
      ...super.serialize(),
      roleId: this.roleId,
      roleName: this.roleName,
      isAlliedHealth: this.isAlliedHealth,
    };
  }
}
