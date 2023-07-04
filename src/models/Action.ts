import {
  validate,
  IsString,
  IsInt,
  IsOptional,
  IsArray,
  ValidateNested,
} from "class-validator";
import moment from "moment";
import { unixTimestamp } from "next-shared/src/types/dateTypes";
import { ISerializable } from "next-shared/src/types/ISerializable";
import { cloneModelObject } from "next-shared/src/helpers/cloneModelObject";
import { ValidationError } from "next-shared/src/helpers/errorTypes";
import { calculateNextOccurrences } from "next-shared/src/helpers/calculateNextOccurrences";

import {
  ActionFulfillment,
  EActionFulfillmentResolution,
  IActionFulfillment,
} from "./ActionFulfillment";
import { TActionOccurrence } from "../types/TActionOccurrence";
import { IBaseAction, TActionResolution } from "../types/IBaseAction";
import { occurrencesToText } from "../helpers/occurrencesToText";
import { currentUnixTimestamp } from "../helpers/currentUnixTimestamp";
import { ArticlePreview, IArticlePreview } from "./Article";
import { MedicationDetails, IMedicationDetails } from "./MedicationDetails";
import { HtmlMessage, IHtmlMessage } from "./HtmlMessage";
import { DocumentDetails, IDocumentDetails } from "./DocumentDetails";

export const ActionTypes = [
  // prescribing education
  "article",
  // releasing lab results and letters
  "document",
  // for appointment reminders and recalls
  "appointment",
  // for instructions
  "instruction",
  // medications
  "medication",
  // simple to do items
  "todo",
  // a form to complete, e.g. assessment form
  "form",
  // tracking reminders, e.g. weight, daily steps
  "observation",
] as const;

export type IActionType = typeof ActionTypes[number];

const actionIconMap: { [key: string]: string } = {
  article: "file",
  document: "certificate",
  appointment: "appointments",
  instruction: "write",
  medication: "medications",
  todo: "task-boolean",
  form: "conditions",
  observation: "obs-weight",
};

export interface IAction<TData extends unknown = unknown> {
  actionId?: string;

  type: IActionType;

  title: string;
  data: TData;

  /** The external resource this action relates, as based on the type to, e.g. medication ID, document ID */
  externalSource?: string;
  externalId?: string;
  /** The slug of the operational slug explaining this action */
  documentationSource?: string;
  documentationId?: string;

  authorId: string;
  subjectId: string;
  ownerId: string;

  occurrences: TActionOccurrence[];

  /** What the action was generated from */
  actionTemplateId?: string;

  createdAt?: unixTimestamp;
  updatedAt?: unixTimestamp;
  deletedAt?: unixTimestamp;
  resolvedAt?: unixTimestamp;

  nextFulfillmentGeneration?: unixTimestamp;

  // the computed next fulfillment
  fulfillments?: IActionFulfillment[];

  /**
   * Time that this action was concluded.
   */
  concludedAt?: unixTimestamp;
  /**
   * When the action should be concluded if not concluded before hand.
   */
  endDate?: unixTimestamp;
  /**
   * Time that this action was concluded.
   */
  activeAt?: unixTimestamp;
  /**
   * The ID of the EHR that created the action.
   */
  ehrOfOriginId?: string;

  /**
   * Timezone information like 'Australia/Sydney' for the Subject
   */
  latestSubjectTimezone?: string;
}

export class ActionBase<TResource extends unknown = unknown>
  implements ISerializable
{
  @IsOptional()
  @IsString()
  public actionId: string;

  @IsString()
  public type: IActionType;

  // used in combination with type for external links
  @IsOptional()
  @IsString()
  public externalSource: string;
  @IsOptional()
  @IsString()
  public externalId: string;

  @IsOptional()
  @IsString()
  public documentationSource: string;
  @IsOptional()
  @IsString()
  public documentationId: string;

  // textual summary of action
  @IsString()
  public title: string;

  /**
   * Resource field is used to contain custom object models
   * specific to the type of Action it is. It is the unserialized version of
   * "data" field in the database.
   */
  @IsOptional()
  public resource: TResource;

  @IsOptional()
  @IsString()
  public category: string;

  @IsOptional()
  @IsInt()
  public createdAt: unixTimestamp;

  @IsOptional()
  @IsInt()
  public updatedAt: unixTimestamp;

  @IsOptional()
  @IsInt()
  public resolvedAt: unixTimestamp;

  @IsOptional()
  @IsInt()
  public deletedAt?: null | unixTimestamp = null;

  @IsString()
  public authorId: string;

  @IsString()
  public subjectId: string;

  @IsString()
  public ownerId: string;

  // TODO - perhaps occurrences should be a model as well, so that we can validate
  @IsArray()
  public occurrences: TActionOccurrence[] = [];

  @IsOptional()
  @IsString()
  public actionTemplateId?: string;

  @IsOptional()
  @IsInt()
  public nextFulfillmentGeneration?: unixTimestamp;

  @IsOptional()
  @ValidateNested()
  public fulfillments?: ActionFulfillment[] = [];

  @IsOptional()
  @IsInt()
  public concludedAt?: unixTimestamp;

  @IsOptional()
  @IsInt()
  public endDate: unixTimestamp;

  @IsOptional()
  @IsInt()
  public activeAt: unixTimestamp;

  @IsOptional()
  @IsString()
  public ehrOfOriginId?: string;

  @IsOptional()
  protected data: unknown;

  // TODO - review the need for unserializing into the Action model when doing front end "create" and then making this prop mandatory and validated.
  @IsOptional()
  @IsString()
  public latestSubjectTimezone?: string;

  /**
   * Generates a human readable label for the occurances
   */
  public getOccurrenceLabel(): string {
    return Array.isArray(this.occurrences)
      ? occurrencesToText(this.occurrences)
      : "Pending";
  }

  public get id() {
    return this.actionId;
  }

  // TODO review logic
  public get isActive() {
    return !!this.activeAt && !this.concludedAt;
  }

  // TODO review logic
  public activate(): void {
    if (this.isActive) return;
    if (this.concludedAt) {
      this.concludedAt = null;
    }
    if (!this.activeAt) {
      this.activeAt = currentUnixTimestamp();
    }
  }

  /**
   * Exports the action to format presented in the action list.
   * // TODO - What's the intent for this?
   */
  public toBaseAction(): IBaseAction {
    let title = this.title;
    switch (this.type) {
      case "form":
        title = `Please fill in: ${this.title}`;
        break;
      case "article":
        title = `To read: ${this.title}`;
        break;
    }

    return {
      resolvedAt: this.resolvedAt,
      resolution: this.getStatus(),
      title: title,
      description: this.getOccurrenceLabel(),
      disabled: !this.isActive,
      icon: actionIconMap[this.type],
      // keyDate:
      // comment:
    };
  }

  /**
   * Generates the next set of fulfillments for the next earliest day sorted by dueAt, removing those already attached to the action.
   * The remove duplicate logic is primarily used for migration purpose when transitioning between
   * old data format to the new.
   *
   */
  public generateNextFulfillments(
    from?: unixTimestamp,
    createAsFulfilled?: boolean,
  ): ActionFulfillment[] {
    if ((this.occurrences || []).length <= 0) {
      return [];
    }
    // Firstly, check whether next fulfillments should be generated.
    // If nextFulfillmentGeneration time is not due yet, then don't generate new action fulfillments
    // TODO: future implementation could make activeAt a future date to "delay" activation by doing a date comparison
    const fromTimestamp = from || currentUnixTimestamp();

    // HACK need to make sure the calling logic does not call this and think that it does not have any
    // fulfillments
    if (
      this.nextFulfillmentGeneration &&
      fromTimestamp < this.nextFulfillmentGeneration
    ) {
      return [];
    }

    const actionNeedsFulfillments =
      !!this.activeAt &&
      !this.concludedAt &&
      fromTimestamp >= this.activeAt &&
      (!this.endDate || this.endDate > fromTimestamp);

    if (!actionNeedsFulfillments) {
      return [];
    }

    // default to "from now"
    const nextOccurrences = calculateNextOccurrences(
      this.occurrences,
      this.latestSubjectTimezone,
      fromTimestamp,
    );

    // Note that the return type here is unix epoch timestamp (seconds) instead of JS timestmap (milliseconds);
    const earliestTimestamp = nextOccurrences.reduce(
      (earliestOccurrence, nextOccurrence) => {
        if (nextOccurrence < earliestOccurrence) {
          return nextOccurrence;
        }
        return earliestOccurrence;
      },
      Infinity,
    ) as unixTimestamp;

    if (earliestTimestamp < fromTimestamp) {
      return [];
    }

    const earliestMoment = moment.unix(earliestTimestamp);

    const allFulfillmentsOnNextEarliestDate = nextOccurrences
      .reduce((fulfillments, occurrenceTimestamp: unixTimestamp) => {
        if (moment.unix(occurrenceTimestamp).isSame(earliestMoment, "date")) {
          return [
            ...fulfillments,
            ActionFulfillment.unserialize({
              actionId: this.actionId,
              dueAt: occurrenceTimestamp,
              resolution: createAsFulfilled
                ? EActionFulfillmentResolution.Success
                : undefined,
              resolvedAt: createAsFulfilled
                ? currentUnixTimestamp()
                : undefined,
            }),
          ];
        }
        return fulfillments;
      }, [] as ActionFulfillment[])
      .map((actionFulfillment) => {
        actionFulfillment.fulfillmentId = actionFulfillment.uniqueId();
        return actionFulfillment;
      });

    const newFulfillments = allFulfillmentsOnNextEarliestDate
      // Sort the array by dueAt in ascending order
      .sort((a, b) => b.dueAt - a.dueAt);
    return newFulfillments;
  }

  /**
   * Determine when this action is next due based on the current fulfillments.
   */
  public nextDue(): null | unixTimestamp {
    const dueDate = this.fulfillments
      .filter((f) => !f.resolution)
      .map((f) => f.dueAt);
    const nextDate = Math.min(...dueDate) || null;

    if (nextDate === Infinity) {
      return null;
    }
    return nextDate;
  }

  public filterSensitiveData(): this {
    return cloneModelObject(this);
  }

  public serialize(): IAction<TResource> {
    return {
      actionId: this.actionId,
      type: this.type,
      title: this.title,
      data: this.resource,

      externalSource: this.externalSource,
      externalId: this.externalId,
      documentationSource: this.documentationSource,
      documentationId: this.documentationId,

      authorId: this.authorId,
      subjectId: this.subjectId,
      ownerId: this.ownerId,

      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      deletedAt: this.deletedAt,
      resolvedAt: this.resolvedAt,

      actionTemplateId: this.actionTemplateId,
      occurrences: this.occurrences,

      nextFulfillmentGeneration: this.nextFulfillmentGeneration,

      concludedAt: this.concludedAt,

      endDate: this.endDate,

      fulfillments: (this.fulfillments || []).map((a) => a.serialize()),

      activeAt: this.activeAt,

      ehrOfOriginId: this.ehrOfOriginId,
      latestSubjectTimezone: this.latestSubjectTimezone,
    };
  }

  public static unserialize(data: IAction) {
    const newAction = new ActionBase();

    newAction.actionId = data?.actionId;
    newAction.type = data.type;
    newAction.title = data.title;
    newAction.data = data.data;
    newAction.resource = data.data;

    newAction.documentationSource = data.documentationSource;
    newAction.documentationId = data.documentationId;
    newAction.externalSource = data.externalSource;
    newAction.externalId = data.externalId;

    newAction.createdAt = data.createdAt;
    newAction.updatedAt = data.updatedAt;
    newAction.deletedAt = data.deletedAt;
    newAction.resolvedAt = data.resolvedAt;
    newAction.concludedAt = data.concludedAt;

    newAction.authorId = data.authorId;
    newAction.subjectId = data.subjectId;
    newAction.ownerId = data.ownerId;

    newAction.actionTemplateId = data.actionTemplateId;

    newAction.occurrences = data?.occurrences || [];

    newAction.nextFulfillmentGeneration = data.nextFulfillmentGeneration;

    newAction.fulfillments = Array.isArray(data.fulfillments)
      ? data.fulfillments.map((d) => ActionFulfillment.unserialize(d))
      : data.fulfillments;
    newAction.activeAt = data.activeAt;
    newAction.endDate = data.endDate;
    newAction.ehrOfOriginId = data.ehrOfOriginId;

    newAction.latestSubjectTimezone = data.latestSubjectTimezone;
    return newAction;
  }

  public async validate(): Promise<boolean> {
    const errors = await validate(this);
    // class-validation should validate this already
    // for (let i = 0; i < this.fulfillments.length; i++) {
    //   // will throw if there is an error
    //   await this.fulfillments[i].validate();
    // }
    if (errors.length > 0) {
      throw new ValidationError(errors);
    }
    return true;
  }
  /**
   * // TODO: implement other statuses
   * Experimental function that will return the status of the action
   * based on its various lifecycle properties (i.e. concludedAt)
   */
  public getStatus(): TActionResolution {
    if (this.concludedAt) {
      return "concluded";
    }
    if (this.activeAt) {
      return "active";
    }
    return "inactive";
  }

  public getData(): unknown {
    return this.data;
  }
  /**
   * Get the string version of the data prop.
   */
  public getRawData(): string {
    return JSON.stringify(this.data);
  }

  /**
   * Whether this action should be concluded.
   * @returns true if it should be concluded.
   */
  // TODO - need unit test!
  public shouldBeConcluded(): boolean {
    // already concluded, so no
    if (!!this.concludedAt) {
      return false;
    }
    // end date has passed.
    if (this.endDate && this.endDate >= currentUnixTimestamp()) {
      return true;
    }

    // check if all current fulfillments have a resolution. If not, then it should not be concluded.
    for (const fulfillment of this.fulfillments) {
      if (!fulfillment.resolution) {
        return false;
      }
    }

    // check for next occurrences that are coming after now.
    const comingOccurrences = calculateNextOccurrences(
      this.occurrences,
      this.latestSubjectTimezone,
    ).filter(
      (occurrence: unixTimestamp) => occurrence >= currentUnixTimestamp(),
    );
    // if true (no more occurrences), this action should be concluded.
    if (comingOccurrences.length <= 0) {
      return true;
    }

    return false;
  }
}

/**
 * Instruction action has a "HtmlMessage" resource prop.
 */
export class InstructionAction extends ActionBase<HtmlMessage> {
  @ValidateNested()
  public resource: HtmlMessage;

  public static unserialize(data: IAction<IHtmlMessage>) {
    const newAction = super.unserialize(data) as InstructionAction;
    newAction.resource = HtmlMessage.unserialize(data.data);
    return newAction;
  }

  public async validate(): Promise<boolean> {
    if (this.type !== "instruction") {
      throw new ValidationError(
        `Invalid action type. InstructionAction must be of type "instruction", ${this.type} used`,
      );
    }
    if (!this.resource?.message) {
      throw new ValidationError(
        `Invalid action resource. InstructionAction resource must be an object with "message" field. `,
      );
    }
    const errors = await validate(this);
    if (errors.length > 0) {
      throw new ValidationError(errors);
    }
    return true;
  }
}

/**
 * MedicationAction is used for actions that carries medication prescription
 * information. It has a "MedicationDetail" resource prop.
 */
export class MedicationAction extends ActionBase<MedicationDetails> {
  @ValidateNested()
  public resource: MedicationDetails;

  public static unserialize(data: IAction<IMedicationDetails>) {
    const newAction = super.unserialize(data) as MedicationAction;
    newAction.resource = MedicationDetails.unserialize(data.data);
    return newAction;
  }

  public async validate(): Promise<boolean> {
    if (this.type !== "medication") {
      throw new ValidationError(
        `Invalid action type. MedicationAction must be of type "medication", ${this.type} used`,
      );
    }
    if (!this.resource?.title) {
      throw new ValidationError(
        `Invalid action resource. MedicationAction resource must be an object with "title" field. `,
      );
    }
    const errors = await validate(this);
    if (errors.length > 0) {
      throw new ValidationError(errors);
    }
    return true;
  }
}

/**
 * ArticleAction is used for actions that assigns an article to a patient.
 * It has an ArticlePreview as its resource prop
 */
export class ArticleAction extends ActionBase<ArticlePreview> {
  @ValidateNested()
  public resource: ArticlePreview;

  public static unserialize(data: IAction<IArticlePreview>) {
    const newAction = super.unserialize(data) as ArticleAction;
    newAction.resource = ArticlePreview.unserialize(data.data);
    return newAction;
  }

  public async validate(): Promise<boolean> {
    if (this.type !== "article") {
      throw new ValidationError(
        `Invalid action type. ArticleAction must be of type "article", ${this.type} used`,
      );
    }

    const errors = await validate(this);
    if (errors.length > 0) {
      throw new ValidationError(errors);
    }
    return true;
  }
}

// TODO: Complete implementation. Adding this class for the `toBaseAction` variation above
export class ObservationAction extends ActionBase<string> {
  public toBaseAction() {
    return {
      resolvedAt: this.resolvedAt,
      resolution: this.getStatus(),
      title: `Track your ${this.title}`,
      description: this.getOccurrenceLabel(),
      icon: this.resource,
    };
  }

  public async validate(): Promise<boolean> {
    if (this.type !== "observation") {
      throw new ValidationError(
        `Invalid action type. ObservationAction must be of type "observation", ${this.type} used`,
      );
    }
    const errors = await validate(this);
    if (errors.length > 0) {
      throw new ValidationError(errors);
    }
    return true;
  }
}

export const DOCUMENT_CATEGORY_LETTER = "letter";
export const DOCUMENT_CATEGORY_LAB_RESULT = "lab-result";
/**
 * Action to capture letters, lab results and other medical
 * documents from a provider to the patient.
 */
export class DocumentAction extends ActionBase<DocumentDetails> {
  @ValidateNested()
  public resource: DocumentDetails;

  public static unserialize(data: IAction<IDocumentDetails>) {
    const newAction = super.unserialize(data) as DocumentAction;
    newAction.resource = DocumentDetails.unserialize(data.data);
    return newAction;
  }

  public async validate(): Promise<boolean> {
    if (this.type !== "document") {
      throw new ValidationError(
        `Invalid action type. DocumentAction must be of type "document", ${this.type} used`,
      );
    }
    if (!this.resource?.documentId) {
      throw new ValidationError(
        `Invalid action resource. DocuemntAction resource must be an object with a "documentId" field.`,
      );
    }
    if (!this.resource?.title) {
      throw new ValidationError(
        `Invalid action resource. DocuemntAction resource must be an object with a "title" field.`,
      );
    }
    if (!this.resource?.category) {
      throw new ValidationError(
        `Invalid action resource. DocuemntAction resource must be an object with a "category" field.`,
      );
    }

    const errors = await validate(this);
    if (errors.length > 0) {
      throw new ValidationError(errors);
    }
    return true;
  }
}

export type TActionModel =
  | ActionBase<unknown>
  | InstructionAction
  | MedicationAction
  | ArticleAction
  | ObservationAction
  | DocumentAction;
/**
 * This is the generic Action model. The "unserialize" method of this class
 * will create an Action instance based on the action type if it's one of the
 * specialised Action (i.e. Instruction, Medication, Document, Observation, Article).
 * Otherwise it's just a standard action with the `resource` prop that's a POJO (plain old javascript object)
 */
export class Action extends ActionBase {
  public static unserialize(action: IAction): TActionModel {
    switch (action.type) {
      case "instruction": {
        const actionInstance = InstructionAction.unserialize(
          action as IAction<IHtmlMessage>,
        );
        return actionInstance;
      }
      case "medication": {
        const actionInstance = MedicationAction.unserialize(
          action as IAction<IMedicationDetails>,
        );
        return actionInstance;
      }
      case "article": {
        const actionInstance = ArticleAction.unserialize(
          action as IAction<IArticlePreview>,
        );
        return actionInstance;
      }
      case "observation": {
        const actionInstance = ObservationAction.unserialize(
          action as IAction<string>,
        );
        return actionInstance;
      }
      case "document": {
        const actionInstance = DocumentAction.unserialize(
          action as IAction<IDocumentDetails>,
        );
        return actionInstance;
      }
      default: {
        const actionInstance = super.unserialize(action);
        return actionInstance;
      }
    }
  }
}
