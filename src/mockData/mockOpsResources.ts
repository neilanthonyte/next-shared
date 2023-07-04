import { FilesResource, IFilesResource } from "../models/FilesResource";

const mockOpsResourcesJson: IFilesResource[] = [
  {
    title: "Business Plan Template",
    description:
      "Next Practice Partners can use this as a guide to complete a Business Plan prior to opening their clinic.",
    assetUrl:
      "https://d1qr34qzhiwpdo.cloudfront.net/resources/Business-Plan-Template-Operations-Manual-V2_191204_031743.docx",
    category: "A) Planning",
  },
  {
    title: "Quarterly Plan Template",
    description:
      "Prior to each Quarter within the Financial Year Next Practice Partners can use this template to plan out all the outcomes that need to be achieved within the Quarter in the form of a GANT Chart.",
    assetUrl:
      "https://d1qr34qzhiwpdo.cloudfront.net/resources/Quarterly-Plan-Template-Operations-Manual.xlsx",
    category: "A) Planning",
  },
  {
    title: "Business Continuity Plan - Companion App New Patient Form",
    description: "Intake Form for New Patients",
    assetUrl:
      "https://d1qr34qzhiwpdo.cloudfront.net/resources/Companion-App-Intake-Form-New-Patient-Contingency-Template.docx",
    category: "A) Planning",
  },
  {
    title: "Business Continuity Plan - Consultation Notes Template",
    description: "Contingency template for consultation notes",
    assetUrl:
      "https://d1qr34qzhiwpdo.cloudfront.net/resources/Consultation-Notes-Contingency-Template.docx",
    category: "A) Planning",
  },
  {
    title: "Id aliquip ipsum magna",
    posterImage:
      "https://d1qr34qzhiwpdo.cloudfront.net/services/images/_galleryFull/Living-room-main.jpg",
    description:
      "Fugiat pariatur non amet elit irure sunt veniam esse do eiusmod culpa pariatur dolore. Excepteur aliqua dolor sunt cillum nulla. Nulla quis nostrud sit do deserunt ut dolore nostrud.",
    category: "Fundamentals",
    assets: [
      {
        label: "My file",
        assetUrl: "#",
        fileType: "pdf",
      },
      {
        label: "Another file",
        assetUrl:
          "https://d1qr34qzhiwpdo.cloudfront.net/services/images/_galleryFull/Living-room-main.jpg",
        fileType: "jpg",
      },
    ],
  },
  {
    title: "Amet exercitation sint",
    description:
      "Nisi ut labore nisi in eiusmod ad ad esse laborum ex laborum.",
    category: "Fundamentals",
    assets: [
      {
        label: "My file",
        assetUrl:
          "https://d1qr34qzhiwpdo.cloudfront.net/services/images/_galleryFull/Living-room-main.jpg",
        fileType: "jpg",
      },
    ],
  },
];

export const mockOpsResources = mockOpsResourcesJson.map((i) =>
  FilesResource.unserialize(i),
);
