export interface ICmsNotificationTemplate {
  slug: string;
  title: string;
  content: string;
  deliveryMethods: Array<"sms" | "mobile-push" | "web-push">;
  notificationsSendDelayMinutes?: number; // not used
}
