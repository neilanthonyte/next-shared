import { TTemplateSlug } from "./cmsTemplateSlug";

/**
 * Request params for rendering a notification.
 */
export interface IRenderNotificationRequest {
  notificationTemplate: TTemplateSlug;
  notificationData: any;
}
