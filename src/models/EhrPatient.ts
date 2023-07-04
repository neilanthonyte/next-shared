import moment from "moment";

import { fhirUtil } from "../fhirUtil";
import { FhirPersonUtil } from "../fhirUtil/utilClasses/FhirPersonUtil";
import { cloneModelObject } from "../helpers/cloneModelObject";
import { IPatientEhrAssociation } from "../types/IPatientEhrAssociation";
import { ISerializable } from "../types/ISerializable";

export interface IEhrPatient {
  fhir: fhir3.Patient;
  association: IPatientEhrAssociation;
}

/**
 * Patient as represented in the ehr
 * Includes temporary association used to link to a Next Patient
 */
export class EhrPatient implements ISerializable {
  public fhir: fhir3.Patient;
  public association: IPatientEhrAssociation;

  public serialize() {
    return {
      fhir: this.fhir,
      association: this.association,
    };
  }

  get ehrPatientId() {
    return this.association.ehrPatientId;
  }

  get ehrPatientIdAlt() {
    return this.association.ehrPatientIdAlt;
  }

  get appAccessCode() {
    return this.association.appAccessCode;
  }

  public static unserialize(data: IEhrPatient): EhrPatient {
    const newEhrPatient = new EhrPatient();

    newEhrPatient.fhir = data.fhir;
    newEhrPatient.association = data.association;

    return newEhrPatient;
  }

  public filterSensitiveData(): this {
    return cloneModelObject(this);
  }

  public getDisplayName(): string | null {
    if (!this.fhir) {
      return null;
    }

    return fhirUtil<FhirPersonUtil>(this.fhir).getDisplayName();
  }

  public getAge(): number {
    if (!this.fhir) {
      return null;
    }

    const age = moment(this.fhir.birthDate, "YYYY-MM-DD");
    return moment().diff(age, "years");
  }

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
}
