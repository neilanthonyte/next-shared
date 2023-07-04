export enum EStaffAlertType {
  Highlight = "success",
  Info = "info",
  Warning = "warning",
  Danger = "danger",
}

export interface IStaffAlerts {
  text: string;
  description: string;
  type: EStaffAlertType;
  icon: string;
}
