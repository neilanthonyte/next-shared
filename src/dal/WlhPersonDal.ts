import { inject, injectable } from "inversify";

import { EPersonType } from "../types/EPersonType";

import { IDatabaseService } from "../services/DatabaseService";
import { IWlhPatient, WlhPatient } from "../models/WlhPatient";
import { IWlhProvider, WlhProvider } from "../models/WlhProvider";

export interface IWlhPersonDal {
  /**
   * Retrieves minimal information for a provider.
   * This is Minimal Info because we are only retrieving demographic information for the provider
   * Full information will include preferences, settings and identifiers
   *
   * @param {string} providerId - The ID of the provider.
   * @returns {Promise<IWlhProvider | undefined>} A promise that resolves to the minimal information of the provider, or undefined if the provider is not found or not an instance of WlhProvider.
   */
  getProviderMinimalInfo(providerId: string): Promise<IWlhProvider | undefined>;

  /**
   * Retrieves minimal information for a patient.
   * This is Minimal Info because we are only retrieving demographic information for the patient
   * Full information will include preferences, settings and identifiers
   *
   * @param {string} providerId - The ID of the patient.
   * @returns {Promise<IWlhProvider | undefined>} A promise that resolves to the minimal information of the patient, or undefined if the patient is not found or not an instance of WlhPatient.
   */
  getPatientMinimalInfo(patientId: string): Promise<IWlhPatient | undefined>;
}

@injectable()
export class WlhPersonDal implements IWlhPersonDal {
  private PERSONS_TABLE = "persons";
  private USERS_TABLE = "users";

  constructor(
    @inject("DatabaseService") private _databaseService: IDatabaseService,
  ) {}

  private async getPersonMinimalInfo(
    personId: string,
  ): Promise<WlhPatient | WlhProvider | undefined> {
    const databaseConnection = this._databaseService.getConnection();
    const person = await databaseConnection(this.PERSONS_TABLE)
      .join(
        this.USERS_TABLE,
        `${this.USERS_TABLE}.userId`,
        "=",
        `${this.PERSONS_TABLE}.personId`,
      )
      .select(
        "personId",
        "firstName",
        "lastName",
        "middleName",
        "gender",
        "avatarFilename",
        "birthDate",
        "displayName",
        "prefix",
        "suffix",
        "personType",
      )
      .where("personId", personId)
      .first();

    if (!person) {
      return;
    }

    switch (person.personType) {
      case EPersonType.PATIENT:
        // Build WlhPatient
        return new WlhPatient({ ...person, patientId: person.personId });

      case EPersonType.DOCTOR:
        // Build WlhProvider
        return new WlhProvider({ ...person, providerId: person.personId });

      default:
        return;
    }
  }

  public async getProviderMinimalInfo(
    providerId: string,
  ): Promise<IWlhProvider | undefined> {
    const provider = await this.getPersonMinimalInfo(providerId);
    if (!provider || !(provider instanceof WlhProvider)) {
      return;
    }
    return provider.serialize();
  }

  public async getPatientMinimalInfo(
    patientId: string,
  ): Promise<IWlhPatient | undefined> {
    const patient = await this.getPersonMinimalInfo(patientId);
    if (!patient || !(patient instanceof WlhPatient)) {
      return;
    }
    return patient.serialize();
  }
}
