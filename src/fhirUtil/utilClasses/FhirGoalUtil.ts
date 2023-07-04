import moment from "moment";
import * as _ from "lodash";

import { FhirResourceUtil } from "./FhirResourceUtil";
import { MedicalResourceType } from "../../types/types";
import { unixTimestamp } from "../../types/dateTypes";

export const goalObsTypeExtensionUrl =
  "http://nextpracticehealth.com/extension/goal/obs-resource-type";
export const goalObsDisplayNameExtensionUrl =
  "http://nextpracticehealth.com/extension/goal/obs-display-name";
export const goalMinValueExtensionUrl =
  "http://nextpracticehealth.com/extension/goal/min-value";
export const goalMaxValueExtensionUrl =
  "http://nextpracticehealth.com/extension/goal/max-value";

export class FhirGoalUtil<
  T extends fhir3.Goal = fhir3.Goal,
> extends FhirResourceUtil<T> {
  public getObsResourceType(): MedicalResourceType {
    return this.getExtensionStringValue(
      goalObsTypeExtensionUrl,
    ) as MedicalResourceType;
  }

  public getGoalObsDisplayName(): string {
    return this.getExtensionStringValue(goalObsDisplayNameExtensionUrl);
  }

  public getGoalMinValue(): number {
    return this.getExtensionIntegerValue(goalMinValueExtensionUrl);
  }

  public getGoalMaxValue(): number {
    return this.getExtensionIntegerValue(goalMaxValueExtensionUrl);
  }

  public getGoalUnit(): string {
    if (this.getObsResourceType() === "observation:BloodPressure") {
      return "mmHg";
    }
    return _.get(this.resource, "target.detailQuantity.unit");
  }

  public getGoalValue(): string {
    if (this.getObsResourceType() === "observation:BloodPressure") {
      const coding = this.resource.target.detailCodeableConcept.coding;
      const systolic = coding.find(
        (x) =>
          x.system === "http://nextpracticehealth.com/BloodPressure/Systolic",
      );
      const diastolic = coding.find(
        (x) =>
          x.system === "http://nextpracticehealth.com/BloodPressure/Diastolic",
      );
      return `${systolic.code}/${diastolic.code}`;
    }

    return _.get(this.resource, "target.detailQuantity.value");
  }

  public getStartDate(): unixTimestamp | null {
    if (this.resource.startDate) {
      return moment(this.resource.startDate).unix();
    }
    return null;
  }
}
