export type weekday =
  | "monday"
  | "tuesday"
  | "wednesday"
  | "thursday"
  | "friday"
  | "saturday"
  | "sunday";

export interface IMedicationReminder {
  medicationId: string;
  days: weekday[];
  times: Array<{ hour: number; minute: number }>;
  enabled: boolean;
}
