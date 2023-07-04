import faker from "faker";
import * as _ from "lodash";

import { Course, ICourse } from "../models/Course";

const genDescription = () =>
  _.times(2, () => `<p>${faker.lorem.paragraph()}</p>`).join("");

const mockCoursesJson: ICourse[] = [
  {
    title: "Test course title 1",
    slug: "slug-1",
    posterImage: "http://lorempixel.com/601/600/",
    description: genDescription(),
    articleSlugs: [
      "opening",
      "equipment-and-safe-operating-procedures",
      "food-safety-1",
      "a-daily-tasks",
    ],
  },
  {
    title: "Test course title 2",
    slug: "slug-2",
    posterImage: "http://lorempixel.com/601/600/",
    description: genDescription(),
    articleSlugs: [
      "opening",
      "equipment-and-safe-operating-procedures",
      "food-safety-1",
      "a-daily-tasks",
    ],
  },
];

export const mockCourses = mockCoursesJson.map((c) => Course.unserialize(c));
