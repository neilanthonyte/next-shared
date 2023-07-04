import faker from "faker";

import { createGuid } from "../helpers/guid";
import { IAction, ActionTypes, IActionType, Action } from "../models/Action";
import { IMedicationDetails } from "../models/MedicationDetails";
import { IArticlePreview } from "../models/Article";

import { mockMedicalArticlesJson } from "./mockMedicalArticles";
import { IHtmlMessage } from "../models/HtmlMessage";
import { IDocumentDetails } from "../models/DocumentDetails";
import { mockLabResults } from "./mockLabResults";
import { mockLetters } from "./mockLetters";
import {
  TActionOccurrence,
  TActionOccurrenceType,
} from "../types/TActionOccurrence";
import { currentUnixTimestamp } from "../helpers/currentUnixTimestamp";
import { EWeekday } from "../types/IReoccurringTime";

export const generateMockMedicationDetail = (): IMedicationDetails => {
  return {
    title: `mock-medication-${faker.lorem.word()}`,
    dosage: `${faker.random.number(10)} mg`,
    direction: `${faker.lorem.sentence()}`,
  };
};

export const generateMockArticle = (): IArticlePreview => {
  return faker.random.arrayElement(mockMedicalArticlesJson);
};

export const generateMockInstruction = (): IHtmlMessage => {
  return {
    message: faker.lorem.sentence(),
  };
};

export const generateMockDocument = (): IDocumentDetails => {
  const documentCategories = ["Letter", "Lab result"];
  const documentCategory = faker.random.arrayElement(documentCategories);

  const associatedDocument =
    documentCategory === "Lab result"
      ? faker.random.arrayElement(mockLabResults)
      : faker.random.arrayElement(mockLetters);

  return {
    documentId: associatedDocument.id.toString(),
    title: associatedDocument.name,
    category: documentCategory,
  };
};

export const generateMockActionData = (
  actionType: IActionType,
):
  | IArticlePreview
  | IHtmlMessage
  | IDocumentDetails
  | IMedicationDetails
  | string => {
  switch (actionType) {
    case "medication":
      return generateMockMedicationDetail();
    case "article":
      return generateMockArticle();
    case "document":
      return generateMockDocument();
    case "instruction":
      return generateMockInstruction();
    default:
      return faker.random.words();
  }
};

export const generateMockOccurrence = (
  type?: TActionOccurrenceType,
): TActionOccurrence => {
  const occurrenceType =
    type ?? faker.random.arrayElement(["single", "week", "month", "year"]);
  switch (occurrenceType) {
    case "week":
      const allWeekDays = [
        EWeekday.Monday,
        EWeekday.Tuesday,
        EWeekday.Wednesday,
        EWeekday.Thursday,
        EWeekday.Friday,
        EWeekday.Saturday,
        EWeekday.Sunday,
      ];
      return {
        type: occurrenceType,
        weekdays: allWeekDays.slice(
          0,
          faker.random.number({
            min: 1,
            max: 6,
          }),
        ),
        timeOfDay: [
          {
            hour: faker.random.number({
              min: 0,
              max: 12,
            }),
            minute: faker.random.number({
              min: 0,
              max: 59,
            }),
          },
        ],
      };
    case "month":
      return {
        type: occurrenceType,
        days: [1, 2, 3, 28],
        timeOfDay: [
          {
            hour: faker.random.number({
              min: 0,
              max: 12,
            }),
            minute: faker.random.number({
              min: 0,
              max: 59,
            }),
          },
        ],
      };
    case "year":
      return {
        type: occurrenceType,
        months: [1, 3, 6, 12],
        days: [15],
        timeOfDay: [
          {
            hour: faker.random.number({
              min: 0,
              max: 12,
            }),
            minute: faker.random.number({
              min: 0,
              max: 59,
            }),
          },
        ],
      };
    case "single":
      // Set it to the next day.
      return {
        type: occurrenceType,
        time: currentUnixTimestamp() + 60 * 60 * 24,
      };
  }
};

export const generateMockAction = (
  customActionOverrides?: Partial<IAction>,
) => {
  const defaultMockType = faker.random.arrayElement(ActionTypes);
  const defaultMockAction: IAction = {
    actionId: `generated-action-${createGuid(6)}`,
    type: defaultMockType,
    title: faker.random.words(3),
    data: generateMockActionData(defaultMockType),
    externalSource: faker.internet.domainWord(),
    externalId: `generated-external-id-${createGuid(6)}`,
    authorId: `generated-author-${createGuid(6)}`,
    subjectId: `generated-patient-${createGuid(6)}`,
    ownerId: `generated-owner-${createGuid(6)}`,
    occurrences: [generateMockOccurrence()],
    activeAt: currentUnixTimestamp(),
    latestSubjectTimezone: "Australia/Sydney",
  };

  const mockAction = Action.unserialize({
    ...defaultMockAction,
    ...customActionOverrides,
  });

  mockAction.fulfillments = mockAction.generateNextFulfillments();
  return mockAction;
};

/**
 * Generate mock actions for testing.
 * @param count
 * @param customActionOverrides
 */
export const generateMockActions = (
  count: number,
  customActionOverrides?: Partial<IAction>,
) => {
  return Array.from({
    length: count,
  }).map(() =>
    generateMockAction({
      ...customActionOverrides,
    }),
  );
};
