import {
  ISerializedChecklist,
  Checklist,
} from "next-shared/src/models/Checklist";
import {
  ISerializedChecklistDayPreview,
  ChecklistDayPreview,
} from "next-shared/src/models/ChecklistDayPreview";
import { mockOpsTasksSerialized } from "./mockOpsTasks";

export const mockDayPreviewSerialized: ISerializedChecklistDayPreview = {
  id: 20,
  date: "2019-12-02",
  createdAt: 1570768256,
  updatedAt: null,
  locationId: "678",
  totalTasks: 2,
  completedTasks: 2,
  incompleteTasks: 0,
  completedTasksWeight: 2,
  maximumTaskWeight: 2,
  scorePercent: 100,
  score: "F",
};

export const mockDayPreview: ChecklistDayPreview =
  ChecklistDayPreview.unserialize(mockDayPreviewSerialized);

export const mockChecklistSerialized: ISerializedChecklist = {
  date: "2019-12-02",
  isOpenToday: true,
  dayPreview: mockDayPreviewSerialized,
  checklistTasks: mockOpsTasksSerialized,
};

export const mockChecklist: Checklist = Checklist.unserialize(
  mockChecklistSerialized,
);
