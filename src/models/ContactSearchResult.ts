import { IsString, IsNotEmpty, IsOptional } from "class-validator";

import { IExternalContactAddress } from "../types/IExternalContactAddress";
import { IExternalContactTelecom } from "../types/IExternalContactTelecom";
import {
  PersistableModel,
  ISerializedPersistableModel,
} from "./PersistableModel";

export interface IContactSearchResult extends ISerializedPersistableModel {
  // Id of the contact from external system
  foreignId: string;
  name: string; // Contact's full name
  speciality: string; // Contact's speciality
  organization?: string | undefined; // Contact's organization
  type: string; // Type of contact. Eg: PRACTITIONER_ROLE
  directory: string; // Source from where we got the contact eg: LOCAL / MO / HEALTHLINK
  address: IExternalContactAddress; // Contact's address
  telecoms: IExternalContactTelecom; // Contact's telecom details
}

/**
 * Contact response we get from the external system
 */
export class ContactSearchResult
  extends PersistableModel
  implements IContactSearchResult
{
  @IsString()
  @IsNotEmpty()
  foreignId: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsOptional()
  speciality: string;

  @IsString()
  @IsOptional()
  organization: string;

  @IsString()
  @IsNotEmpty()
  type: string;

  @IsString()
  @IsNotEmpty()
  directory: string;

  @IsOptional()
  address: IExternalContactAddress;

  @IsOptional()
  telecoms: IExternalContactTelecom;

  constructor(data: IContactSearchResult) {
    super(data);
    this.foreignId = data.foreignId;
    this.name = data.name;
    this.speciality = data.speciality;
    this.organization = data.organization || undefined;
    this.type = data.type;
    this.directory = data.directory;
    this.address = data.address;
    this.telecoms = data.telecoms;
  }

  public serialize(): IContactSearchResult {
    return {
      foreignId: this.foreignId,
      name: this.name,
      speciality: this.speciality,
      organization: this.organization || undefined,
      type: this.type,
      directory: this.directory,
      address: this.address,
      telecoms: this.telecoms,
    };
  }
}
