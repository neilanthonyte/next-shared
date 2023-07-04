import { baseTemplate } from "./partials/baseTemplate";
import { fullWidthImage } from "./partials/fullWidthImage";
import { baseRow } from "./partials/baseRow";
// import { confirmationBody } from "./partials/confirmationBody";
import { appointmentDetails } from "./partials/appointmentDetails";
import { boxedText } from "./partials/boxedText";
import { locationDetails } from "./partials/locationDetails";
import { dualImages } from "./partials/dualImages";
import { buttons } from "./partials/buttons";
import { payments } from "./partials/payments";

const bannerUrl =
  "https://d1qr34qzhiwpdo.cloudfront.net/emails/banner-appointmentConfirmation.jpg";

const signupUrl = "{{ cmsUrl }}/signup";

const appCalloutScreenshotsUrl =
  "https://d1qr34qzhiwpdo.cloudfront.net/emails/appCallout-screenshots.jpg";

const care4CareUrl = "https://d1qr34qzhiwpdo.cloudfront.net/emails/nextAid.jpg";

export const appointmentConfirmationHtml = baseTemplate([
  baseRow(fullWidthImage({ imageUrl: bannerUrl, linkToUrl: signupUrl }), {
    variant: "primary",
    id: "templatePreheader",
  }),
  baseRow(dualImages("{{ locationImage }}", "{{ practitionerProfileImage }}")),
  baseRow(appointmentDetails()),
  baseRow(
    buttons([
      {
        label: "Complete your appointment details",
        fieldName: "manageAppointmentUrl",
        url: "{{ cmsUrl }}{{ manageAppointmentUrl }}",
        variant: "primary",
      },
      {
        label: "Start your Telehealth consult",
        fieldName: "telehealthUrl",
        url: "{{ telehealthUrl }}",
        variant: "primary",
      },
      {
        // EDIT nice way of saying cancel
        label: "Change your appointment",
        fieldName: "cancelAppointmentUrl",
        url: "{{ cmsUrl }}{{ cancelAppointmentUrl }}",
      },
    ]),
  ),
  baseRow(locationDetails()),
  baseRow(payments()),
  baseRow(
    buttons([
      {
        label: "Click to download the Next Practice app",
        url: signupUrl,
        variant: "primary",
      },
    ]),
  ),
  baseRow(
    fullWidthImage({
      imageUrl: appCalloutScreenshotsUrl,
      linkToUrl: signupUrl,
    }),
  ),
  baseRow(
    boxedText(null, "The Next Practice app puts your healthcare in your hands"),
  ),
  baseRow(fullWidthImage({ imageUrl: care4CareUrl })),
]);
