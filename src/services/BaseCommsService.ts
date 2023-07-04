import Moustache from "mustache";
import { injectable } from "inversify";

import { IEmail, IEmailContent, IEmailAttachment } from "../types/IEmail";
import { getEmailTemplateByName } from "../helpers/getEmailTemplateByName";
import { traceLogging } from "../util/traceLogging";
import { INotification } from "../types/INotification";
import { INotificationContent } from "../types/INotification";
import { IReoccurringTime } from "../types/IReoccurringTime";
import { IReoccurringNotification } from "../types/IReoccurringNotification";
import { IContact, IPartialContact } from "../types/IContact";
import { ICommsNetworkService } from "./CommsNetworkService";

import { IConfig } from "../IoC/config";

export interface IBaseCommsService {
  sendDirectEmail(
    address: string,
    templateSlug?: string,
    data?: any,
    attachments?: IEmailAttachment[],
    name?: string | undefined,
    sendDate?: number,
  ): Promise<IEmail>;
}

@traceLogging("CommsService")
@injectable()
export class BaseCommsService implements IBaseCommsService {
  public constructor(
    protected _config: IConfig,
    protected _commsNetworkService: ICommsNetworkService,
  ) {}

  /**
   * This is consolidated from sendDirectEmail from src/SpgCommsClient.ts in spg-comms-client and the local
   * original commsService sendDirectEmail that used it. Both methods were being used with different parameters
   * in next-services--now all should use the following (note only 'address' is required):
   *
   * @param address
   * @param templateSlug
   * @param data
   * @param attachments
   * @param name
   * @param sendDate
   * @returns Promise<IEmail>
   */
  public async sendDirectEmail(
    address: string,
    templateSlug?: string,
    data?: any,
    attachments?: IEmailAttachment[],
    name?: string | undefined,
    sendDate?: number,
  ): Promise<IEmail> {
    let content: IEmailContent;
    if (templateSlug) {
      content = await this.renderEmailTemplate(templateSlug, data);
    } else {
      // HACK: if no template is specified, assume the data is already in IEmailContent format
      // (support old spg-comms client pattern)
      content = data;
    }

    if (!content.html || !content.subject) {
      console.warn("Invalid email content", JSON.stringify(data));
      throw new Error("Invalid email content");
    }

    if (attachments && attachments.length) {
      content.attachments = attachments;
    }

    content = this.handleAttachments(content);

    // consolidated from 'sendDirectEmail' and 'sendScheduledDirectEmail' in src/SpgCommsClient.ts from spg-comms-client
    // next-comms will determine whether to schedule based on sendDate being truthy
    const resData = await this._commsNetworkService.makeCommsRequest({
      url: `send-direct-email`,
      method: "post",
      data: {
        email: {
          emailAddress: address,
          name,
          sendDate,
          ...content,
        },
      },
    });
    return resData.email;
  }

  // TODO: this works as an extensible super class method because we're getting templates from hard-coded
  // HTML strings in the getEmailTemplateByName helper, whereas notifications/SMS (see renderNotificationTemplate in
  // next-services/src/services/CommsService sub class) still rely on CMS requests for templates. If that changes, for
  // either email or SMS, the placement of these methods (and whether they are shared, and/or whether the CMS service
  // should be shared) should be discussed.
  protected async renderEmailTemplate(
    templateSlug: string,
    data?: any,
  ): Promise<IEmailContent> {
    const template = getEmailTemplateByName(templateSlug);

    if (template === null) {
      throw new Error(`Email template '${templateSlug}' not found`);
    }

    const emailContent: IEmailContent = {
      subject: Moustache.render(template.subject, data, undefined, {
        escape: (x: string) => x,
      }),
      html: Moustache.render(template.html, data, undefined, {
        escape: (x: string) => x,
      }),
    };

    return emailContent;
  }

  protected async updateContact(
    contactRef: string,
    contact: IPartialContact,
  ): Promise<IContact> {
    const resData = await this._commsNetworkService.makeCommsRequest({
      url: `contacts/${contactRef}/`,
      method: "patch",
      data: { contact },
    });
    return resData.contact;
  }

  protected async retrieveContact(contactRef: string): Promise<IContact> {
    const resData = await this._commsNetworkService.makeCommsRequest({
      url: `contacts/${contactRef}/`,
      method: "get",
    });
    return resData.contact;
  }

  protected async updateReoccurringNotification(
    contactRef: string,
    reoccurringNotificationRef: string,
    content: INotificationContent,
    reoccurs: IReoccurringTime[],
  ): Promise<IReoccurringNotification> {
    const resData = await this._commsNetworkService.makeCommsRequest({
      url: `contacts/${contactRef}/reoccurring-notifications/${reoccurringNotificationRef}`,
      method: "patch",
      data: {
        reoccurringNotification: {
          ...content,
          reoccurs,
        },
      },
    });
    return resData.reoccurringNotification;
  }

  protected async sendEmail(
    contactRef: string,
    content: IEmailContent,
    sendDate?: number,
  ): Promise<IEmail> {
    content = this.handleAttachments(content);

    // consolidated from 'sendEmail' and 'sendScheduledEmail' in src/SpgCommsClient.ts from spg-comms-client
    // next-comms will determine whether to schedule based on sendDate being truthy
    const resData = await this._commsNetworkService.makeCommsRequest({
      url: `contacts/${contactRef}/send-email`,
      method: "post",
      data: {
        email: {
          ...content,
          sendDate,
        },
      },
    });
    return resData.email;
  }

  protected handleAttachments(content: IEmailContent): IEmailContent {
    if (content.attachments && content.attachments.length) {
      content.attachments = content.attachments.map((att) => {
        // if they give us a string, convert it to a buffer so we can base64 it.
        const bufferContent =
          typeof att.content === "string"
            ? Buffer.from(att.content)
            : att.content;
        return {
          filename: att.filename,
          content: bufferContent.toString("base64"),
        };
      });
    }
    return content;
  }

  protected async sendNotification(
    contactRef: string,
    content: INotificationContent,
    sendDate?: number,
  ): Promise<INotification> {
    // if sendDate is passed, add content spread and sendDate to payload, otherwise just simple content
    // next-comms will determine whether to schedule based on sendDate being truthy
    const resData = await this._commsNetworkService.makeCommsRequest({
      url: `contacts/${contactRef}/send-notification`,
      method: "post",
      data: {
        notification: {
          ...content,
          sendDate,
        },
      },
    });
    return resData.notification;
  }

  protected async registerMobilePushDevice(
    contactRef: string,
    playerId: string,
    deviceName: string,
  ): Promise<void> {
    await this._commsNetworkService.makeCommsRequest({
      url: `contacts/${contactRef}/register-mobile-push-device`,
      method: "post",
      data: { playerId, deviceName },
    });
  }

  protected async unregisterMobilePushDevice(
    contactRef: string,
    playerId: string,
  ): Promise<void> {
    await this._commsNetworkService.makeCommsRequest({
      url: `contacts/${contactRef}/unregister-mobile-push-device`,
      method: "post",
      data: { playerId },
    });
  }
}
