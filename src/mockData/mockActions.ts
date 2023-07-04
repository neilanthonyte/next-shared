import faker from "faker";
import * as uuid from "uuid";

import { mockMedicationRequests } from "./mockFhirPatientResources";
import { mockPatients } from "./mockPatients";
import { mockMedicalArticles } from "./mockMedicalArticles";
import { EWeekday } from "../types/IReoccurringTime";
import { IHtmlMessage } from "../models/HtmlMessage";
import { IMedicationDetails } from "../models/MedicationDetails";
import { IArticlePreview } from "../models/Article";
import { IDocumentDetails } from "../models/DocumentDetails";
import { mockLetters } from "./mockLetters";
import { mockHcps } from "./mockHcps";
import { mockNextLocations } from "./mockLocations";
import { mockLabResults } from "./mockLabResults";
import { PatientLabResultType } from "../types/types";
import { Action, IAction } from "../models/Action";
import { currentUnixTimestamp } from "../helpers/currentUnixTimestamp";
import { fhirUtil } from "../fhirUtil";
import { FhirMedicationRequestUtil } from "../fhirUtil/utilClasses/FhirMedicationRequestUtil";

export const generateFulfillment = (
  actionId: string,
  fulfilledById: string,
  comment: string,
) => {
  return {
    id: uuid.v4(),
    actionId,
    fulfilledById: fulfilledById,
    dueAt: currentUnixTimestamp(),
    completedAt: currentUnixTimestamp(),
    status: "open",
    comment,
  };
};

const getMockMedicationFromFhirMedicationRequest = (
  fhirMedicationUtil: FhirMedicationRequestUtil,
): IMedicationDetails => {
  return {
    title: fhirMedicationUtil.getDisplayText(),
    // TODO these are not supported for now, might be in the future when creating medication action
    // at the moment these details will be available by fetching the full fhir3.MedicationRequest from ehr
    // direction: fhirMedicationUtil.getMedicationDirection(),
    // dosage: fhirMedicationUtil.getMedicationDosage(),
    // route: fhirMedicationUtil.getMedicationDosage(),
  };
};

const htmlMessage = `
<h2>
  What are the types of anxiety disorders?
</h2>
<p>Anxiety is a key part of several different disorders. These include:</p>
<ul>
  <li><a href="https://www.healthline.com/health/panic-disorder">panic disorder</a>: experiencing recurring
    panic attacks at unexpected times. A person with panic disorder may live in fear of the next panic attack.</li>
  <li><a href="https://www.healthline.com/health/phobia-simple-specific">phobia</a>: excessive fear of a
    specific object, situation, or activity</li>
  <li><a href="https://www.healthline.com/health/anxiety/social-phobia">social anxiety disorder</a>: extreme
    fear of being judged by others in social situations</li>
  <li><a href="https://www.healthline.com/health/ocd/social-signs">obsessive-compulsive disorder</a>: recurring
    irrational thoughts that lead you to perform specific, repeated behaviors</li>
  <li><a href="https://www.healthline.com/health/anxiety/separation-anxiety">separation anxiety disorder</a>:
    fear of being away from home or loved ones</li>
  <li><a href="https://www.healthline.com/health/health-anxiety">illness anxiety disorder</a>: anxiety about
    your health (formerly called hypochondria)</li>
  <li><a href="https://www.healthline.com/health/post-traumatic-stress-disorder">post-traumatic stress
      disorder</a> (PTSD): anxiety following a traumatic event</li>
</ul>`;

const fhirMedicationUtils = mockMedicationRequests.map((med) =>
  fhirUtil<FhirMedicationRequestUtil>(med),
);

const mockActionsJson: IAction<any>[] = [
  {
    actionId: "action-medication-01",
    type: "medication",
    occurrences: [
      {
        type: "week",
        weekdays: [
          EWeekday.Monday,
          EWeekday.Tuesday,
          EWeekday.Wednesday,
          EWeekday.Thursday,
          EWeekday.Friday,
          EWeekday.Saturday,
          EWeekday.Sunday,
        ],
        timeOfDay: [
          {
            hour: 20,
            minute: 0,
          },
        ],
      },
    ],
    title: `Take ${fhirMedicationUtils[0].getDisplayText()}`,
    data: getMockMedicationFromFhirMedicationRequest(fhirMedicationUtils[0]),

    // patient made this for themselves
    authorId: mockPatients[0].patientId,
    subjectId: mockPatients[0].patientId,
    ownerId: mockPatients[0].patientId,

    externalSource: mockNextLocations[0].ehrId,
    externalId: mockMedicationRequests[0].id,

    // 5 days ago
    createdAt: currentUnixTimestamp() - 5 * 24 * 60 * 60,
    updatedAt: currentUnixTimestamp() - 5 * 24 * 60 * 60,
    activeAt: currentUnixTimestamp() - 5 * 24 * 60 * 60,
    latestSubjectTimezone: "Australia/Sydney",
  } as IAction<IMedicationDetails>,
  {
    actionId: "action-medication-02",
    type: "medication",
    title: `Take ${fhirMedicationUtils[1].getDisplayText()}`,
    data: getMockMedicationFromFhirMedicationRequest(fhirMedicationUtils[1]),
    occurrences: [],
    // patient made this for themselves
    authorId: mockPatients[0].patientId,
    subjectId: mockPatients[0].patientId,
    ownerId: mockPatients[0].patientId,

    externalSource: mockNextLocations[0].ehrId,
    externalId: mockMedicationRequests[1].id,

    createdAt: currentUnixTimestamp(),
    updatedAt: currentUnixTimestamp(),
    latestSubjectTimezone: "Australia/Sydney",
  } as IAction<IMedicationDetails>,
  {
    actionId: "action-article-01",
    type: "article",
    occurrences: [
      {
        type: "single",
        time: currentUnixTimestamp(),
      },
    ],
    title: mockMedicalArticles[0].title,
    data: {
      ...mockMedicalArticles[0],
    },
    // patient made this for themselves
    authorId: mockPatients[0].patientId,
    subjectId: mockPatients[0].patientId,
    ownerId: mockPatients[0].patientId,

    externalSource: "medicalArticle",
    externalId: mockMedicalArticles[0].slug,

    createdAt: currentUnixTimestamp(),
    updatedAt: currentUnixTimestamp(),
    resolvedAt: currentUnixTimestamp(),
    concludedAt: currentUnixTimestamp(),
    activeAt: currentUnixTimestamp(),
    latestSubjectTimezone: "Australia/Sydney",
  } as IAction<IArticlePreview>,
  {
    actionId: "action-article-02",
    type: "article",
    occurrences: [
      {
        type: "single",
        time: currentUnixTimestamp(),
      },
    ],
    title: faker.lorem.words(5),
    data: {
      ...mockMedicalArticles[1],
    },

    // patient made this for themselves
    authorId: mockPatients[0].patientId,
    subjectId: mockPatients[0].patientId,
    ownerId: mockPatients[0].patientId,

    externalSource: "medicalArticle",
    externalId: mockMedicalArticles[1].slug,

    createdAt: currentUnixTimestamp(),
    updatedAt: currentUnixTimestamp(),
    resolvedAt: currentUnixTimestamp(),
    concludedAt: currentUnixTimestamp(),
    activeAt: currentUnixTimestamp(),
    latestSubjectTimezone: "Australia/Sydney",
  } as IAction<IArticlePreview>,
  {
    actionId: "action-article-03",
    type: "article",
    occurrences: [
      {
        type: "single",
        time: currentUnixTimestamp(),
      },
    ],
    title: faker.lorem.words(5),
    data: {
      ...mockMedicalArticles[2],
    },

    // patient made this for themselves
    authorId: mockPatients[0].patientId,
    subjectId: mockPatients[0].patientId,
    ownerId: mockPatients[0].patientId,

    externalSource: "medicalArticle",
    externalId: mockMedicalArticles[2].slug,

    createdAt: currentUnixTimestamp(),
    updatedAt: currentUnixTimestamp(),
    activeAt: currentUnixTimestamp(),
    latestSubjectTimezone: "Australia/Sydney",
  } as IAction<IArticlePreview>,
  {
    actionId: "action-message-01",
    type: "instruction",
    occurrences: [
      {
        type: "single",
        time: currentUnixTimestamp(),
      },
    ],
    title: "Dealing with Anxiety",
    data: {
      message: htmlMessage,
    },

    // patient made this for themselves
    authorId: mockPatients[0].patientId,
    subjectId: mockPatients[0].patientId,
    ownerId: mockPatients[0].patientId,

    externalId: null,

    createdAt: currentUnixTimestamp(),
    updatedAt: currentUnixTimestamp(),
    activeAt: currentUnixTimestamp(),
    latestSubjectTimezone: "Australia/Sydney",
  } as IAction<IHtmlMessage>,
  {
    actionId: "action-letter-01",
    type: "document",
    occurrences: [
      {
        type: "single",
        time: currentUnixTimestamp(),
      },
    ],
    title: `New ${mockLetters[0].letterTemplateName} from your doctor`,
    data: {
      documentId: mockLetters[0].id.toString(),
      category: "Letter",
      title: mockLetters[0].letterTemplateName,
    } as IDocumentDetails,
    // patient made this for themselves
    authorId: mockHcps[0].npServicesId,
    subjectId: mockPatients[0].patientId,
    ownerId: mockPatients[0].patientId,

    externalSource: `helix:${
      mockNextLocations.find((loc) => loc.slug === mockHcps[0].worksAt).ehrId
    }`,
    externalId: `letter:${mockLetters[0].id.toString()}`,

    createdAt: currentUnixTimestamp(),
    activeAt: currentUnixTimestamp(),
    updatedAt: currentUnixTimestamp(),
    latestSubjectTimezone: "Australia/Sydney",
  } as IAction<IDocumentDetails>,
  {
    actionId: "action-lab-result-01",
    type: "document",
    occurrences: [
      {
        type: "single",
        time: currentUnixTimestamp(),
      },
    ],
    title: `New pathology result from your doctor`,
    data: {
      documentId: mockLabResults
        .find(
          (l) => l.artefactClassification === PatientLabResultType.Pathology,
        )
        .id.toString(),
      category: "Lab result",
      title: "Blood panel",
    } as IDocumentDetails,
    // patient made this for themselves
    authorId: mockHcps[0].npServicesId,
    subjectId: mockPatients[0].patientId,
    ownerId: mockPatients[0].patientId,

    externalSource: `helix:${
      mockNextLocations.find((loc) => loc.slug === mockHcps[0].worksAt).ehrId
    }`,
    externalId: `labResult:${mockLabResults
      .find((l) => l.artefactClassification === PatientLabResultType.Pathology)
      .id.toString()}`,

    createdAt: currentUnixTimestamp(),
    activeAt: currentUnixTimestamp(),
    updatedAt: currentUnixTimestamp(),
    latestSubjectTimezone: "Australia/Sydney",
  } as IAction<IDocumentDetails>,
  {
    actionId: "action-lab-result-02",
    type: "document",
    occurrences: [
      {
        type: "single",
        time: currentUnixTimestamp(),
      },
    ],
    title: `New radiology result from your doctor`,
    data: {
      documentId: mockLabResults
        .find((l) => l.artefactClassification === PatientLabResultType.Imaging)
        .id.toString(),
      category: "Lab result",
      title: "Chest x-ray",
    } as IDocumentDetails,
    // patient made this for themselves
    authorId: mockHcps[1].npServicesId,
    subjectId: mockPatients[0].patientId,
    ownerId: mockPatients[0].patientId,

    externalSource: `helix:${
      mockNextLocations.find((loc) => loc.slug === mockHcps[1].worksAt).ehrId
    }`,
    externalId: `labResult:${mockLabResults
      .find((l) => l.artefactClassification === PatientLabResultType.Imaging)
      .id.toString()}`,

    createdAt: currentUnixTimestamp(),
    activeAt: currentUnixTimestamp(),
    updatedAt: currentUnixTimestamp(),
    latestSubjectTimezone: "Australia/Sydney",
  } as IAction<IDocumentDetails>,
];

export const mockActions = mockActionsJson.map((a) => {
  const action = Action.unserialize(a);
  action.fulfillments = action.generateNextFulfillments().map((f) => {
    // pretend this was already created
    f.fulfillmentId = f.uniqueId();
    return f;
  });
  return action;
});
