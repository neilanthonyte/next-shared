import { IsInt, IsString } from "class-validator";
import { ISerializable } from "../types/ISerializable";
import { cloneModelObject } from "../helpers/cloneModelObject";
import { unixTimestamp } from "next-shared/src/types/dateTypes";

export interface ISerializedChecklistScore {
  id: string;
  createdAt: unixTimestamp;
  updatedAt: unixTimestamp;
  scoreLabel: string;
  minValue: number;
  maxValue: number;
  status: string;
}

export class ChecklistScore implements ISerializable {
  @IsString()
  id: string;

  @IsInt()
  createdAt: unixTimestamp;

  @IsInt()
  updatedAt: unixTimestamp;

  @IsString()
  scoreLabel: string;

  @IsInt()
  minValue: number;

  @IsInt()
  maxValue: number;

  @IsString()
  status: string;

  public static unserialize(
    checklistScore: ISerializedChecklistScore,
  ): ChecklistScore {
    const newChecklistScore = new ChecklistScore();

    newChecklistScore.id = checklistScore.id;
    newChecklistScore.createdAt = checklistScore.createdAt;
    newChecklistScore.updatedAt = checklistScore.updatedAt;
    newChecklistScore.scoreLabel = checklistScore.scoreLabel;
    newChecklistScore.minValue = checklistScore.minValue;
    newChecklistScore.maxValue = checklistScore.maxValue;
    newChecklistScore.status = checklistScore.status;

    return newChecklistScore;
  }

  public serialize() {
    return {
      id: this.id,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      scoreLabel: this.scoreLabel,
      minValue: this.minValue,
      maxValue: this.maxValue,
      status: this.status,
    };
  }

  public filterSensitiveData() {
    return cloneModelObject(this);
  }
}
