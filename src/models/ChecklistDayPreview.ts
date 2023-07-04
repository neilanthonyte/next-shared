import { IsInt, IsNumber, IsString } from "class-validator";

import { unixTimestamp } from "../types/dateTypes";
import { ISerializable } from "../types/ISerializable";
import { cloneModelObject } from "../helpers/cloneModelObject";
import { ChecklistTask } from "./ChecklistTask";
import { ChecklistScore } from "./CheckListScore";
import { checklistScoreToGrade } from "../helpers/checklistScoreToGrade";

export interface ISerializedChecklistDayPreview {
  id?: number;
  date: string;
  createdAt?: unixTimestamp;
  updatedAt?: unixTimestamp | null;
  locationId: string;
  totalTasks: number;
  completedTasks: number;
  incompleteTasks: number;
  completedTasksWeight: number;
  maximumTaskWeight: number;
  scorePercent: number;
  score: string;
}

export class ChecklistDayPreview implements ISerializable {
  @IsNumber()
  id: number;

  @IsString()
  date: string;

  @IsInt()
  createdAt: unixTimestamp;

  @IsInt()
  updatedAt: unixTimestamp;

  @IsString()
  locationId: string;

  @IsInt()
  totalTasks: number;

  @IsInt()
  completedTasks: number;

  @IsInt()
  incompleteTasks: number;

  @IsInt()
  completedTasksWeight: number;

  @IsInt()
  maximumTaskWeight: number;

  @IsInt()
  scorePercent: number;

  @IsString()
  score: string;

  @IsInt()
  get getScore(): number {
    // TODO - put back later. Investigate on why.
    const score = env.checklistWeightedScore
      ? this.completedTasksWeight / this.maximumTaskWeight
      : this.completedTasks / this.totalTasks;
    return isNaN(score) ? 0 : score;
    // return 0;
  }

  @IsString()
  get getGrade(): string {
    return checklistScoreToGrade(this.getScore);
  }

  public static unserialize(
    checklistDayPreview: ISerializedChecklistDayPreview,
  ): ChecklistDayPreview {
    const newChecklistDayPreview = new ChecklistDayPreview();

    newChecklistDayPreview.id = checklistDayPreview.id;
    newChecklistDayPreview.date = checklistDayPreview.date;
    newChecklistDayPreview.createdAt = checklistDayPreview.createdAt;
    newChecklistDayPreview.updatedAt = checklistDayPreview.updatedAt;
    newChecklistDayPreview.locationId = checklistDayPreview.locationId;
    newChecklistDayPreview.totalTasks = checklistDayPreview.totalTasks;
    newChecklistDayPreview.completedTasks = checklistDayPreview.completedTasks;
    newChecklistDayPreview.incompleteTasks =
      checklistDayPreview.incompleteTasks;
    newChecklistDayPreview.completedTasksWeight =
      checklistDayPreview.completedTasksWeight;
    newChecklistDayPreview.maximumTaskWeight =
      checklistDayPreview.maximumTaskWeight;
    newChecklistDayPreview.scorePercent = checklistDayPreview.scorePercent;
    newChecklistDayPreview.score = checklistDayPreview.score;

    return newChecklistDayPreview;
  }

  public serialize() {
    return {
      id: this.id,
      date: this.date,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      locationId: this.locationId,
      totalTasks: this.totalTasks,
      completedTasks: this.completedTasks,
      incompleteTasks: this.incompleteTasks,
      completedTasksWeight: this.completedTasksWeight,
      maximumTaskWeight: this.maximumTaskWeight,
      scorePercent: this.scorePercent,
      score: this.score,
    };
  }

  public filterSensitiveData() {
    return cloneModelObject(this);
  }

  public static calcDailyScore(
    checklistTasks: ChecklistTask[],
    scores: ChecklistScore[],
    locationId: string,
    date: string,
  ): ChecklistDayPreview {
    const maximumWeight = checklistTasks.reduce(
      (currentMaximumWeight, checklistTask) =>
        currentMaximumWeight + checklistTask.weight,
      0,
    );

    const currentWeight = checklistTasks
      .filter((checklistTask) => checklistTask.completed)
      .reduce(
        (currentCompletedWeight, checklistTask) =>
          currentCompletedWeight + checklistTask.weight,
        0,
      );

    const scorePercent =
      currentWeight !== 0
        ? Math.round((currentWeight * 100) / maximumWeight)
        : 0;
    const scoreLabel = scores.find(
      (score) =>
        scorePercent >= score.minValue && scorePercent <= score.maxValue,
    );

    const checklistDay = {
      completedTasks: checklistTasks.filter(
        (checklistTask) => checklistTask.completed,
      ).length,
      incompleteTasks: checklistTasks.filter(
        (checklistTask) => !checklistTask.completed,
      ).length,
      date,
      locationId: locationId,
      totalTasks: checklistTasks.length,
      maximumTaskWeight: maximumWeight,
      completedTasksWeight: currentWeight,
      scorePercent: scorePercent,
      score: scoreLabel ? scoreLabel.scoreLabel : "F",
    };

    return ChecklistDayPreview.unserialize(checklistDay);
  }
}
