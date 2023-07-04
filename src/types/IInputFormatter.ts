export interface IInputFormatterPattern {
  type: "pattern";
  pattern: string | RegExp;
  blueprint: string;
  filter: string | RegExp;
}

export interface IPreparedInputFormatterPattern {
  type: "pattern";
  pattern: RegExp;
  blueprint: string;
  filter: RegExp;
}

export interface IInputFormatterCase {
  type: "uppercase" | "lowercase";
}

export type IInputFormatter = IInputFormatterPattern | IInputFormatterCase;
export type IPreparedInputFormatter =
  | IPreparedInputFormatterPattern
  | IInputFormatterCase;
