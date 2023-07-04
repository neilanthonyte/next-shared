import {
  IsString,
  IsOptional,
  IsArray,
  IsDate,
  validate,
} from "class-validator";

import moment from "moment";

import { fhirUtil } from "next-shared/src/fhirUtil";
import { FhirPersonUtil } from "next-shared/src/fhirUtil/utilClasses/FhirPersonUtil";
import { FhirPatientUtil } from "next-shared/src/fhirUtil/utilClasses/FhirPatientUtil";
import { IPaydockSubscription } from "../types/PaydockTypes";
import { unixTimestamp } from "next-shared/src/types/dateTypes";
import { IStaffAlerts } from "../types/staffAlerts";
import { ValidationError } from "../helpers/errorTypes";
import { IPatientEhrAssociation } from "../types/IPatientEhrAssociation";
import { User } from "./User";

export interface ISerializedPatient {
  patientId: string;
  acceptedTerms: string | null;
  hasAcceptedLatestTerms: null | boolean;
  staffAlerts: IStaffAlerts[] | null;
  fhir: fhir3.Patient;
  paydockCustomerId: string;
  subscriptions: IPaydockSubscription[];
  /**
   * This is the date where the patient is first linked via the app.
   * TODO - remove this field, as it's no longer doing what it's intended (above). Since the Octo release,
   * the concept of "date signed up to app", and the way it's tracked is no longer valid.
   *
   */
  dateSignedUpToApp: unixTimestamp | null;
  email: string;
  passwordHash: string;
  passwordResetToken: string | null;
  passwordResetTokenExpiry: number | null;
  twoFactorCode: string | null;
  twoFactorCodeExpiry: number | null;
  irisPatientId: string | null;
  ehrPatients: IPatientEhrAssociation[];
  paymentInformationUpdatedAt: unixTimestamp | null;
  demographicInformationUpdatedAt: unixTimestamp | null;
  lastObservationAt: unixTimestamp | null;
  lastNotificationAt: unixTimestamp | null;
  tourLastSeenAt: unixTimestamp | null;
}

export class Patient extends User {
  @IsString()
  public patientId: string;

  @IsOptional()
  @IsString()
  public acceptedTerms: string | null = null;

  @IsOptional()
  @IsString()
  public hasAcceptedLatestTerms: null | boolean = null;

  public fhir: fhir3.Patient;

  @IsOptional()
  @IsString()
  public paydockCustomerId: string | null = null;

  @IsOptional()
  @IsArray()
  public subscriptions: IPaydockSubscription[] = null;

  @IsArray()
  public staffAlerts: IStaffAlerts[] = [];

  @IsOptional()
  @IsDate()
  public dateSignedUpToApp: unixTimestamp | null = null;

  public irisPatientId: string | null = null;

  public ehrPatients: IPatientEhrAssociation[];

  @IsOptional()
  @IsDate()
  public paymentInformationUpdatedAt: unixTimestamp | null = null;

  @IsOptional()
  @IsDate()
  public demographicInformationUpdatedAt: unixTimestamp | null = null;

  @IsOptional()
  @IsDate()
  public lastObservationAt: unixTimestamp | null = null;

  @IsOptional()
  @IsDate()
  public lastNotificationAt: unixTimestamp | null = null;

  @IsOptional()
  @IsDate()
  public tourLastSeenAt: unixTimestamp | null = null;

  public getAge(): number {
    const age = moment(this.fhir.birthDate, "YYYY-MM-DD");
    return moment().diff(age, "years");
  }

  // note: we should be using patient.email whenever contacting the patient
  public getFhirEmail(): string | null {
    if (!this.fhir) {
      return null;
    }

    return fhirUtil<FhirPersonUtil>(this.fhir).getPrimaryEmail();
  }

  public getPrimaryMobileNumber(): string | null {
    if (!this.fhir) {
      return null;
    }

    return fhirUtil<FhirPersonUtil>(this.fhir).getPrimaryMobileNumber();
  }

  public getDisplayName(): string | null {
    if (!this.fhir) {
      return null;
    }

    return fhirUtil<FhirPersonUtil>(this.fhir).getDisplayName();
  }

  public hasAcceptedTerms(terms: string) {
    // only Major versions are blocking
    if (this.acceptedTerms === null) {
      return false;
    }

    const givenMajor = parseInt(terms.split(".")[0], 10);
    const patientAcceptedMajor = parseInt(this.acceptedTerms.split(".")[0], 10);

    return givenMajor <= patientAcceptedMajor;
  }

  public hasSignedUp() {
    // assume 'signed up' if there's an IRIS Id and a password value or a password reset token
    // Normally a patient record with a matched IRIS FHIR resource will only exist after signup, but
    // this should also handle any pre-loading from the Helix/Hub migration of patients not yet 'linked'
    // Password hashes are removed when the 'forgot' password workflow is entered, but tokens should be set
    return !!(
      this.irisPatientId &&
      (this.passwordHash || this.passwordResetToken)
    );
  }

  public permissionToSendSms(): boolean {
    return fhirUtil<FhirPatientUtil>(this.fhir).permissionToSendSms();
  }

  public serialize(): ISerializedPatient {
    return {
      ...super.serialize(),
      patientId: this.patientId,
      acceptedTerms: this.acceptedTerms,
      hasAcceptedLatestTerms: this.hasAcceptedLatestTerms,

      fhir: this.fhir,

      paydockCustomerId: this.paydockCustomerId,
      subscriptions: this.subscriptions,
      staffAlerts: this.staffAlerts,

      dateSignedUpToApp: this.dateSignedUpToApp,

      irisPatientId: this.irisPatientId,

      ehrPatients: this.ehrPatients,
      paymentInformationUpdatedAt: this.paymentInformationUpdatedAt,
      demographicInformationUpdatedAt: this.demographicInformationUpdatedAt,
      lastObservationAt: this.lastObservationAt,
      lastNotificationAt: this.lastNotificationAt,
      tourLastSeenAt: this.tourLastSeenAt,
    };
  }

  public static unserialize(data: ISerializedPatient): Patient {
    const newPatient = super.unserialize(data) as any as Patient;

    newPatient.patientId = data.patientId;
    newPatient.acceptedTerms = data.acceptedTerms;
    newPatient.hasAcceptedLatestTerms = data.hasAcceptedLatestTerms;

    newPatient.fhir = data.fhir;

    newPatient.paydockCustomerId = data.paydockCustomerId;
    newPatient.subscriptions = data.subscriptions;
    newPatient.staffAlerts = data.staffAlerts;

    newPatient.dateSignedUpToApp = data.dateSignedUpToApp;

    newPatient.irisPatientId = data.irisPatientId;

    newPatient.ehrPatients = data.ehrPatients;

    newPatient.paymentInformationUpdatedAt = data.paymentInformationUpdatedAt;
    newPatient.demographicInformationUpdatedAt =
      data.demographicInformationUpdatedAt;
    newPatient.lastObservationAt = data.lastObservationAt;
    newPatient.lastNotificationAt = data.lastNotificationAt;
    newPatient.tourLastSeenAt = data.tourLastSeenAt;

    return newPatient;
  }

  public async validate(): Promise<boolean> {
    const validated = await validate(this);
    if (validated.length > 0) {
      throw new ValidationError(validated);
    }
    return true;
  }

  public filterSensitiveData(): this {
    return super.filterSensitiveData();
  }

  public isPatientOfEhr(ehrId: string): boolean {
    return this.ehrPatients.some((ehrPatient) => ehrPatient.ehrId === ehrId);
  }

  public ehrPatientByEhr(ehrId: string): IPatientEhrAssociation {
    const ehrPatient = this.ehrPatients.find(
      (ehrPatient) => ehrPatient.ehrId === ehrId,
    );
    if (ehrPatient === undefined) {
      // Log details server-side, throw generic warning
      throw new Error(
        "This next patient account is not associated with the indicated EHR",
      );
    }
    return ehrPatient;
  }
}
