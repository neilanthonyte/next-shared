import { deliveryStatus } from "./deliveryStatus";

export type notificationDeliveryMethod = "sms" | "mobile-push" | "web-push";

export interface INotificationContent {
  title?: string;
  content: string;
  deliveryMethods: notificationDeliveryMethod[];
}

export interface INotification {
  notificationId: number;
  contactId: number;

  title?: string | null; // title is not required for SMSs
  content: string;

  deliveryMethods: notificationDeliveryMethod[];
  sendDate: number; // unix timestamp, a future date is valid - this represents a scheduled notification
  deliveryStatus: deliveryStatus;
  successfulDeliveryMethod: notificationDeliveryMethod | null;
  reasonForFailure: string | null;
}
