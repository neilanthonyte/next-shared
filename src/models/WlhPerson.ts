import { IsEnum, IsOptional, IsString } from "class-validator";
import { EPersonType } from "../types/EPersonType";

export interface IWlhPerson {
  firstName: string | null;
  lastName: string | null;
  middleName: string | null;
  avatarFilename: string | null;
  birthDate: string;
  displayName: string | null;
  gender: number;
  prefix: string | null;
  suffix: string | null;
  personType: EPersonType;
}

/**
 * Represents a person with their personal information.
 * This object is never directly used, this is an abstract representation of WlhPatient / WlhProvider
 * This is supposed to replace IPersonMinimalDTO
 *
 * @typedef {Object} Person
 *
 * @property {string | null} avatarFilename - The filename of the person's avatar, or null if they have no avatar.
 * @property {string} dob - The date of birth of the person in YYYY-MM-DD format.
 * @property {string | null} displayName - The display name of the person, or null if no display name is available.
 * @property {string | null} firstName - The first name of the person, or null if the first name is unknown.
 * @property {number} gender - The gender of the person: 0 for female, 1 for male, or 2 for non-binary.
 * @property {string | null} lastName - The last name of the person, or null if the last name is unknown.
 * @property {string | null} middleName - The middle name of the person, or null if the middle name is unknown.
 * @property {string | null} prefix - The prefix of the person's name, or null if the prefix is unknown.
 * @property {string | null} suffix - The suffix of the person's name, or null if the suffix is unknown.
 * @property {EPersonType} type - The type of person: "patient" or "provider".
 */
export class WlhPerson {
  @IsOptional()
  @IsString()
  avatarFilename: string | null;

  @IsString()
  birthDate: string;

  @IsOptional()
  @IsString()
  displayName: string | null;

  @IsOptional()
  @IsString()
  firstName: string | null;

  @IsEnum([1, 2, 3, 4, 5])
  gender: number;

  @IsOptional()
  @IsString()
  lastName: string | null;

  @IsOptional()
  @IsString()
  middleName: string | null;

  @IsOptional()
  @IsString()
  prefix: string | null;

  @IsOptional()
  @IsString()
  suffix: string | null;

  @IsEnum(EPersonType)
  personType: EPersonType;

  constructor(data?: IWlhPerson) {
    this.avatarFilename = data?.avatarFilename ?? null;
    this.birthDate = data?.birthDate ?? "";
    this.displayName = data?.displayName ?? null;
    this.firstName = data?.firstName ?? null;
    this.gender = data?.gender ?? 0;
    this.lastName = data?.lastName ?? null;
    this.middleName = data?.middleName ?? null;
    this.prefix = data?.prefix ?? null;
    this.suffix = data?.suffix ?? null;
    this.personType = data?.personType ?? EPersonType.PATIENT;
  }

  /**
   * Serialize schema for model
   * @return {IWlhPerson}
   */
  public serialize(): IWlhPerson {
    return {
      avatarFilename: this.avatarFilename,
      birthDate: this.birthDate,
      displayName: this.displayName,
      firstName: this.firstName,
      gender: this.gender,
      lastName: this.lastName,
      middleName: this.middleName,
      prefix: this.prefix,
      suffix: this.suffix,
      personType: this.personType,
    };
  }
}
