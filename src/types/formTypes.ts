export enum EFormFieldLayoutType {
  DEFAULT = "DEFAULT",
  INLINE = "INLINE",
}
export type IFormFieldConditionalType = "visible" | "enable";

export interface IFormatter {
  formatPattern?: RegExp | string;
  formatBlueprint?: string;
  formatFilter?: RegExp | string;
  maxLength?: number;
  toUpperCase?: boolean;
}

export interface IFormat {
  pattern: RegExp;
  message: string;
}

export interface IInput {
  type: string;
  formatters: IFormatter[];
  maxLength?: number;
  minLength?: number;
  format: IFormat;
}

export interface IDataTransformer {}

export interface IFieldInstance {
  status?: any;
  statusPath?: string;
  fields: IFormField[];
}

export type IFieldType =
  | "heading"
  | "divider"
  | "group"
  | "date"
  | "calendarSingle"
  | "calendarRange"
  | "time"
  | "options"
  | "boolean"
  | "number"
  | "integer"
  | "temperature"
  | "username"
  | "email"
  | "dvaNumber"
  | "password"
  | "pin"
  | "postcode"
  | "phone"
  | "mobilePhone"
  | "text"
  | "name"
  | "surname"
  | "textNumber"
  | "IHN"
  | "camera"
  | "likert"
  | "hidden"
  | "concessionCardNumber"
  | "medicareNumber"
  | "passwordConfirm"
  | "acceptLegals"
  | "creditCard"
  | "imageUpload"
  | "individualHealthcareIdentifier"
  | "richContent"
  | "score";

// TODO split compose from different field types to enforce which fields should be allowed with others
interface IFieldConditionalBase {
  path: string;
  type: "visible" | "enable";
}

// For legacy 'conditional' values.
export interface IFieldConditionalLegacy
  extends Partial<IFieldConditionalBase> {
  match?: any;
  isPresent?: boolean;
  matchAny?: string[];
  minValue?: number;
  maxValue?: number;
}

export interface IFieldConditionalMatch extends IFieldConditionalBase {
  condition: "match";
  match?: any;
}
export interface IFieldConditionalMatchAny extends IFieldConditionalBase {
  condition: "matchAny";
  matchAny?: any;
}

export interface IFieldConditionalIsPresent extends IFieldConditionalBase {
  condition: "isPresent";
  isPresent: boolean;
}

export interface IFieldConditionalRange extends IFieldConditionalBase {
  condition: "range";
  maxValue: number;
  minValue: number;
  range?: "inside" | "outside";
}

export interface IFieldConditionalAge extends IFieldConditionalBase {
  condition: "age";
  minAge: number;
  maxAge: number;
}

export interface IFieldConditionalGender extends IFieldConditionalBase {
  condition: "gender";
  gender: "male" | "female" | "other";
}

export interface IFieldConditionalAtsi extends IFieldConditionalBase {
  condition: "atsi";
  atsiStatus:
    | "1" // Aboriginal
    | "2" // Torres Strait Islander
    | "3" // Both Aboriginal & Torres Strait Islander
    | "4" // Neither
    | "5"; // Unspecified
}

export type IFieldConditional =
  | IFieldConditionalMatch
  | IFieldConditionalMatchAny
  | IFieldConditionalIsPresent
  | IFieldConditionalRange
  | IFieldConditionalAge
  | IFieldConditionalGender
  | IFieldConditionalAtsi;

export type IFieldCondition = IFieldConditionalLegacy | IFieldConditional;
// HACK matches TOptionsInputVariant
export type TFormVariant =
  | "dropdown"
  | "grid"
  | "inline"
  | "dots"
  | "icons"
  | "auto";

export interface IFormField {
  // shared
  type: IFieldType;
  map?: string;
  label?: string;
  description?: string;
  disclaimer?: string;
  descriptionImageUrl?: string;
  defaultValue?: any;
  value?: any;
  // options
  variant?: TFormVariant;
  options?: any;
  /** If set to true, illegal existing values will be cleared automatically (instead of being frozen in place) */
  clearIllegalValue?: boolean;
  // ??
  placeholder?: any;
  exportFilterToField?: any;
  presenceCheckPath?: any;
  mapFilterValue?: any;
  forceValue?: any;
  required?: any;
  requiredMessage?: string;
  dateFormat?: string;
  noteLabel?: string;
  readOnly?: boolean;
  formatters?: IFormatter[];
  allowMultiple?: boolean;
  mapFilterField?: any[];
  maxDate?: string;
  minDate?: string;
  errors?: any;
  disabled?: boolean;
  contentUrl?: string;
  fields?: IFormField[];
  conditional?: IFieldCondition | IFieldCondition[];
  pattern?: string;
  patternMessage?: string;
  format?: any;
  minLength?: number;
  maxLength?: number;
  // pin input
  length?: number;
  // number
  maxValue?: number;
  minValue?: number;
  hideKeypad?: boolean;
  // validations
  mustEqual?: any;
  mustEqualMessage?: string;
  remoteCheck?: string;
  remoteSuggestionValidator?: string;
  remoteMessage?: string;
  // group
  layout?: EFormFieldLayoutType;
  newInstanceLabel?: string;
  maxInstances?: number;
  alwaysShowKeypad?: boolean;
  allowNewlines?: boolean;
  incrementValue?: number;
  metadata?: { [key: string]: any };
  // file upload
  uploadNameSpace?: string;
  maxFileSize?: number;
  useGuidForFileName?: boolean;
  // image field
  videoEnvironment?: "user";
  videoWidth?: number;
  isRoundStyle?: boolean;
  mode?: "auto";
  maxImages?: number;
  // suggestions
  suggestion?: {
    name: string;
    prop?: string;
  };
  // likert scales
  preset?: string;
  // richtext
  redactorConfig?: {
    buttons?: string[];
    toolbarFixed?: boolean;
  };
  // auto-fill functionality
  hint?: string;
  // scoring
  formula?: string;
  formulaSrc?: string;
  grades?: {
    min: number;
    max: number;
    value: string;
  }[];
  // internal
  _formatters?: any[];
  _watching?: any[];
  _filterPath?: string;
  _pathRegExp?: RegExp;
  _path?: string;
  _visible?: any;
  _illegal?: any;
  _id?: any;
  _instances?: IFieldInstance[];
}

export type IFormSchema = IFormField[];

export enum EFormType {
  Single = "single",
  Multi = "multi",
}

export interface IFormTransformer {
  type: string;
  path: string;
  filter?: string;
  src?: string;
  dest?: string;
  allowMultiple?: boolean;
  asJson?: boolean;
  direction?: "in" | "out" | "both";
}
interface IFormDetailsBase {
  type: EFormType;
  title?: string;
  description?: string;
  /** Tells the form what data types to use to pre-fill the form */
  data?: string;
}

export interface IFormDetailsSingle extends IFormDetailsBase {
  type: EFormType.Single;
  fields: IFormField[];
  transformers?: IFormTransformer[];
}

export interface IFormDetailsMultiSection {
  label: string;
  schema: IFormDetailsSingle;
}

export interface IFormDetailsMulti extends IFormDetailsBase {
  type: EFormType.Multi;
  transformers?: IFormTransformer[];
  sections: IFormDetailsMultiSection[];
}

export type IFormDetailsMixed = IFormDetailsSingle | IFormDetailsMulti;

export interface IFormSummary {
  title: string;
  slug: string;
  description?: string;
}
