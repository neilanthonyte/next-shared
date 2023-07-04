import { deliveryStatus } from "./deliveryStatus";

export interface IEmailAttachment {
  filename: string;
  encoding?: string;
  content: Buffer | string;
  contentType?: string;
}

export interface IEmailContent {
  subject: string;
  html: string;
  attachments?: IEmailAttachment[];
}

export interface IEmail {
  emailId: number;
  contactId: number;

  subject: string;
  html: string;
  attachments?: IEmailAttachment[];

  sendDate: number; // unix timestamp, a future date is valid - this represents a scheduled email
  deliveryStatus: deliveryStatus;
  reasonForFailure: string | null;
}
