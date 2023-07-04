import { IsBoolean, IsString } from "class-validator";
import { ChecklistTask, ISerializedChecklistTask } from "./ChecklistTask";
import {
  ChecklistDayPreview,
  ISerializedChecklistDayPreview,
} from "./ChecklistDayPreview";
import { cloneModelObject } from "../helpers/cloneModelObject";
import { ISerializable } from "../types/ISerializable";

export interface ISerializedChecklist {
  date: string;
  isOpenToday: boolean;
  dayPreview: ISerializedChecklistDayPreview | null; // if store is closed on a set data there is no day preview generated init
  checklistTasks: ISerializedChecklistTask[];
}

export class Checklist implements ISerializable {
  @IsString()
  public date: string;

  @IsBoolean()
  public isOpenToday: boolean;

  public dayPreview: ChecklistDayPreview;

  public checklistTasks: ChecklistTask[];

  public static unserialize(checklist: ISerializedChecklist): Checklist {
    const newChecklist = new Checklist();

    newChecklist.date = checklist.date;
    newChecklist.isOpenToday = checklist.isOpenToday;
    newChecklist.dayPreview =
      checklist.dayPreview !== null
        ? ChecklistDayPreview.unserialize(checklist.dayPreview)
        : null;
    newChecklist.checklistTasks = checklist.checklistTasks.map(
      (checklistTask) => ChecklistTask.unserialize(checklistTask),
    );

    return newChecklist;
  }

  public serialize() {
    return {
      date: this.date,
      isOpenToday: this.isOpenToday,
      dayPreview: this.dayPreview !== null ? this.dayPreview.serialize() : null,
      checklistTasks: this.checklistTasks.map((checklistTask) =>
        checklistTask.serialize(),
      ),
    };
  }

  public filterSensitiveData() {
    return cloneModelObject(this);
  }
}
