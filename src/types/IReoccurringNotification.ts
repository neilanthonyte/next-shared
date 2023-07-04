import { IReoccurringTime } from "./IReoccurringTime";
import { notificationDeliveryMethod } from "./INotification";

export interface IReoccurringNotification {
  reoccurringNotificationId: number;
  contactId: number;
  extRef: string;

  title?: string | null; // title is not required for SMSs
  content: string;

  deliveryMethods: notificationDeliveryMethod[];
  reoccurs: IReoccurringTime[];
  nextNotificationSendDate: number; // unix timestamp, next time that this is due to send
}
