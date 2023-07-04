import moment from "moment";
import * as _ from "lodash";

import { ISODate } from "next-shared/src/types/dateTypes";
import {
  ISerializedChecklistDayPreview,
  ChecklistDayPreview,
} from "next-shared/src/models/ChecklistDayPreview";

/**
 * Create a set of day previews with somewhat sensible data. Defaults to a month of data.
 */
export const generateMockDayPreviews = (
  startDate: ISODate = moment().subtract(1, "month").format("YYYY-MM-DD"),
  endDate: ISODate = moment().format("YYYY-MM-DD"),
  locationId: string = "1",
) => {
  const start = moment(startDate, "YYYY-MM-DD");
  const end = moment(endDate, "YYYY-MM-DD");
  let id = 1;

  const data: ISerializedChecklistDayPreview[] = [];

  while (start.diff(end) < 0) {
    const total = _.random(20, 30);
    const complete = _.random(0, total);

    data.push({
      id: id++,
      date: start.format("YYYY-MM-DD"),
      createdAt: start.unix(),
      updatedAt: null,
      locationId: locationId,
      totalTasks: total,
      completedTasks: complete,
      incompleteTasks: total - complete,
      completedTasksWeight: 10,
      maximumTaskWeight: 20,
      // LEGACY
      scorePercent: 0,
      score: "",
    });
    start.add(1, "day");
  }
  return _.shuffle(data);
};

export const mockChecklistDayPreviewsSerialized: ISerializedChecklistDayPreview[] =
  generateMockDayPreviews();

export const mockChecklistDayPreviews: ChecklistDayPreview[] =
  mockChecklistDayPreviewsSerialized.map((n) =>
    ChecklistDayPreview.unserialize(n),
  );
