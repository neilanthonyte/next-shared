import { appointmentConfirmationHtml } from "../emails/appointmentConfirmation";
import { baseEmailTemplate } from "../emails/baseEmailTemplate";
import { passwordResetConfirmationHtml } from "../emails/passwordResetConfirmationHtml";
import { postConsultSummary } from "../emails/postConsultSummary";

export interface IEmailTemplate {
  subject: string;
  html: string;
}

export const getEmailTemplateByName = (name: string): IEmailTemplate => {
  switch (name) {
    case "patient-booked-appointment":
      return {
        subject:
          "Appointment at {{time}} with {{practitionerName}} - confirmation",
        html: appointmentConfirmationHtml,
      };
    case "appointment-reminder-5-days":
      return {
        subject: "Five days until your appointment with {{practitionerName}}",
        html: baseEmailTemplate(
          "Dear {{patientName}}",
          `Thank you for booking with Next Practice {{locationName}}.<br/>
This is a reminder of your appointment appointment at {{time}} on {{date}} with {{practitionerName}} at Next Practice {{locationName}}, {{locationAddress.streetAddress}}, {{locationAddress.suburb}} {{locationAddress.state}} {{locationAddress.postcode}}.<br/>
<br/>
If you have booked a Telehealth video appointment you will be sent a video link separately ahead of time.<br/>
<br/>
If you have booked a Telehealth phone appointment your practitioner will call you at the confirmed appointment time.<br/>
<br/>
2 business days cancellation policy applies. For bookings, please use your App or book online at nextpracticehealth.com.<br/>
Please be aware that replies to this message are not monitored. <br/>
<br/>
We look forward to seeing you soon.<br/>
Thank you.<br/>
<br/>
Please DO NOT REPLY by email as this mailbox is not monitored.`,
        ),
      };
    case "appointment-reminder-1-day":
      return {
        subject: "One day until your appointment with {{practitionerName}}",
        html: baseEmailTemplate(
          "Dear {{patientName}}",
          `Thank you for booking with Next Practice {{locationName}}.<br/>
<br/>
This is a reminder of your appointment tomorrow at {{time}} with {{practitionerName}} at Next Practice {{locationName}}, {{locationAddress.streetAddress}}, {{locationAddress.suburb}} {{locationAddress.state}} {{locationAddress.postcode}}.<br/>
<br/>
If you have booked a Telehealth video appointment you will be sent a video link separately ahead of time. <br/>
<br/>
If you have booked a Telehealth phone appointment your practitioner will call you at the confirmed appointment time.<br/>
<br/>
Please be aware that replies to this message are not monitored.<br/>
<br/>
Thank you.<br/>
<br/>
Please DO NOT REPLY by email as this mailbox is not monitored.`,
        ),
      };
    case "new-subscription":
      return {
        subject: "New subscription started",
        html: baseEmailTemplate(
          "New subscription started",
          `You have just started a new {{subscriptionName}} subscription.<br/>
<br/>
You will be charged {{subscriptionAmount}} each {{subscriptionInterval}}{{#subscriptionLength}} for {{subscriptionLength}} payments{{/subscriptionLength}}.<br/>
<br/>
Please DO NOT REPLY by email as this mailbox is not monitored.`,
        ),
      };
    case "booking-failed":
      return {
        subject: "A booking has failed",
        html: baseEmailTemplate(
          "Hello",
          `A booking failed to process and must be entered into helix manually.<br/>
<br/>
Clinic: {{clinicName}}<br/>
Practitioner: {{practitionerName}}<br/>
Date/time: {{dateTime}}<br/>
Appointment type: {{appointmentType}}<br/>
Patient Name: {{patientName}}<br/>
Patient Phone: {{patientPhone}}<br/>
Patient Email: {{patientEmail}}<br/>
Error message: {{errorMessage}}<br/>`,
        ),
      };
    case "new-appointment-practice":
      return {
        subject:
          "Appointment at {{time}} with {{practitionerName}} - processed",
        html: baseEmailTemplate(
          "Hello",
          `An appointment has been made by {{patientName}} with {{practitionerName}} for {{time}}.<br/>
{{#multiHcp}}<br/>
Practitioner breakdown:<br/>
{{#practitioners}}<br/>
{{name}} ({{start}} - {{end}})<br/>
{{/practitioners}}<br/>
{{/multiHcp}}
<br/>
Should you wish to contact the patient their details are:<br/>
Name: {{patientName}}<br/>
Phone: {{patientPhone}}<br/>
Email: {{patientEmail}}`,
        ),
      };
    case "patient-appointment-cancelled":
      return {
        subject: "Your Appointment Has Been Cancelled",
        html: baseEmailTemplate(
          "Hi {{patientName}}",
          `Your appointment with {{practitionerName}} for {{dateTime}} has been successfully cancelled. You can re-book quickly and easily by visiting nextpracticehealth.com<br/>
<br/>
Please DO NOT REPLY by email as this mailbox is not monitored`,
        ),
      };
    case "practice-appointment-cancelled":
      return {
        subject: "An Appointment Has Been Cancelled",
        html: baseEmailTemplate(
          "Hello",
          `This is a courtesy reminder to let you know that {{patientName}} has cancelled their appointment with {{practitionerName}} at {{dateTime}}.<br/>
<br/>
Name: {{patientName}}<br/>
Phone: {{patientPhone}}<br/>
Email: {{patientEmail}}`,
        ),
      };
    case "password-reset":
      return {
        subject: "Request to Reset Next Practice Password",
        html: passwordResetConfirmationHtml,
      };
    case "web-form":
      return {
        subject: "Your practitioner has sent you a form to complete",
        html: baseEmailTemplate(
          "Your practitioner has sent you a form to complete",
          `
<tbody class="mcnButtonBlockOuter">
<tr>
    <td style="padding-top: 0;padding-right: 18px;padding-bottom: 18px;padding-left: 18px;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;" valign="top" align="center" class="mcnButtonBlockInner">
        <table border="0" cellpadding="0" cellspacing="0" class="mcnButtonContentContainer" style="border-collapse: separate !important;border: 2px solid #006E63;border-radius: 0px;background-color: #FFFFFF;mso-table-lspace: 0pt;mso-table-rspace: 0pt;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;">
            <tbody>
                <tr>
                    <td align="center" valign="middle" class="mcnButtonContent" style="font-family: Arial;font-size: 14px;padding: 15px;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;">
                        <a class="mcnButton " title="Start form" href="https://nextpracticehealth.com/{{formUrl}}" target="_blank" style="font-weight: bold;letter-spacing: normal;line-height: 100%;text-align: center;text-decoration: none;color: #006E63;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;display: block;">Start {{formName}}</a>
                    </td>
                </tr>
            </tbody>
        </table>
    </td>
</tr>
</tbody>`,
        ),
      };
    case "post-consult":
      return {
        subject: "Thanks for coming in today",
        // html: baseEmailTemplate(
        //   `Post consult`,
        //   `Hi {{patientName}}, thanks for visiting {{practitionerName}} at {{clinicName}} today. To access your record via the Next Practice app, please use the access code '{{patientAccessCode}}'`
        // )
        html: postConsultSummary,
      };
    case "actions-reminder":
      return {
        subject: "Actions reminder",
        html: baseEmailTemplate(
          "Hello",
          `This is a reminder to let you know that {{actionName}} is due.`,
        ),
      };
    default:
      return null;
  }
};
