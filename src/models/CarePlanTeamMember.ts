import { IsEnum, IsNumber, IsOptional, IsString } from "class-validator";

import FhirDirectory from "../types/FhirDirectory";
import { IExternalContactAddress } from "../types/IExternalContactAddress";
import { IExternalContactTelecom } from "../types/IExternalContactTelecom";
import {
  PersistableModel,
  ISerializedPersistableModel,
} from "./PersistableModel";

export interface ICarePlanTeamMember extends ISerializedPersistableModel {
  carePlanTeamMemberId?: string;
  roleId?: string;
  externalContactId?: string;
  externalContactName?: string;
  externalContactSource?: FhirDirectory;
  externalContactSpecialty?: string;
  externalContactOrganisation?: string;
  externalContactType?: string;
  externalContactAddress?: IExternalContactAddress;
  externalContactTelecom?: IExternalContactTelecom;
  numberOfServices?: number;
}

/**
 * Represents a member of a care plan team who is responsible for providing care to an individual.
 *
 * @class CarePlanTeamMember
 *
 * @property {string} carePlanTeamMemberId - The unique identifier of the care plan team member.
 * @property {string} roleId - The unique identifier of the role associated with the team member.
 * @property {string} [externalContactId] - The unique identifier of the external contact associated with the team member (optional).
 * @property {string} [externalContactName] - Full name of the external contact
 * @property {string} [externalContactSource] - The source of the external contact information (optional).
 * @property {string} [externalContactSpecialty] - The specialty of the external contact (optional).
 * @property {string} [externalContactOrganisation] - The organization of the external contact (optional).
 * @property {string} [externalContactType] - The type of the external contact (optional).
 * @property {IExternalContactAddress} [externalContactAddress] - The address of the external contact (optional).
 * @property {IExternalContactTelecom} [externalContactTelecom] - The telecom information of the external contact (optional).
 * @property {number} [numberOfServices] - The number of services provided by the team member (optional).
 *
 * @param {ICarePlanTeamMember} data - The data used to create a new CarePlanTeamMember instance.
 *
 * @method serialize() - Serializes the instance into an object of type ICarePlanTeamMember.
 *
 * @example
 * const teamMember = new CarePlanTeamMember({
 *  "carePlanTeamMemberId": "f81998c6-64f9-443c-8621-15f1b2c2dc3b",
 *  "roleId": "ad02832e-b575-4d4f-a52e-4e7f1c92e60d",
 *  "externalContactId": "7",
 *  "externalContactName": "Gordon Ramsey",
 *  "externalContactSource": "Medical Object",
 *  "externalContactSpecialty": "Allergist/Immunologist",
 *  "externalContactOrganisation": "Brekke, Gibson and Deckow",
 *  "externalContactType": "PRACTITIONER_ROLE",
 *  "externalContactAddress":
 *    {
 *       "addressId": "123456",
 *       "line1": "123 Main Street",
 *       "line2": null,
 *       "city": "Sydney",
 *       "zip": "2000",
 *       "stateId": null,
 *       "stateAbbr": "NSW",
 *       "countryId": null,
 *       "countryCode": "AU",
 *       "latitude": -33.86785,
 *       "longitude": 151.20732,
 *       "timezoneId": null
 *    },
 *  "externalContactTelecom":
 *    {
 *       "mobilePhone": "0491 570 006",
 *       "homePhone": "0491 570 156",
 *       "workPhone": "0491 570 157",
 *       "email": "example@example.com",
 *       "fax": "0491 570 158"
 *    },
 *  "numberOfServices": 5
 * });
 */

export class CarePlanTeamMember extends PersistableModel {
  @IsOptional()
  @IsString()
  carePlanTeamMemberId: string;

  @IsOptional()
  @IsString()
  roleId: string;

  @IsOptional()
  @IsString()
  externalContactId?: string;

  @IsOptional()
  @IsString()
  externalContactName?: string;

  @IsOptional()
  @IsString()
  externalContactSource?: FhirDirectory;

  @IsOptional()
  @IsString()
  externalContactSpecialty?: string;

  @IsOptional()
  @IsString()
  externalContactOrganisation?: string;

  @IsOptional()
  @IsString()
  externalContactType?: string;

  @IsOptional()
  externalContactAddress?: IExternalContactAddress;

  @IsOptional()
  externalContactTelecom?: IExternalContactTelecom;

  @IsOptional()
  @IsNumber()
  numberOfServices?: number;

  constructor(data: ICarePlanTeamMember) {
    super(data);
    this.carePlanTeamMemberId = data.carePlanTeamMemberId;
    this.roleId = data.roleId;
    this.externalContactId = data.externalContactId;
    this.externalContactName = data.externalContactName;
    this.externalContactSource = data.externalContactSource;
    this.externalContactSpecialty = data.externalContactSpecialty;
    this.externalContactOrganisation = data.externalContactOrganisation;
    this.externalContactType = data.externalContactType;
    this.externalContactAddress = data.externalContactAddress;
    this.externalContactTelecom = data.externalContactTelecom;
    this.numberOfServices = data.numberOfServices;
  }

  public serialize(): ICarePlanTeamMember {
    return {
      // ...super.serialize(), // TODO: Confirm if we need created, updated and deleted
      carePlanTeamMemberId: this.carePlanTeamMemberId,
      roleId: this.roleId,
      externalContactId: this.externalContactId,
      externalContactName: this.externalContactName,
      externalContactSource: this.externalContactSource,
      externalContactSpecialty: this.externalContactSpecialty,
      externalContactOrganisation: this.externalContactOrganisation,
      externalContactType: this.externalContactType,
      externalContactAddress: this.externalContactAddress,
      externalContactTelecom: this.externalContactTelecom,
      numberOfServices: this.numberOfServices,
    };
  }
}
