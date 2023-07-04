import { valueAttachmentConversionExtensionURI } from "../helpers/constants";

// HACK: currently connect and IRIS are on FHIR version R4, while React, shared, services, and MD Hub are on STU3;
// These utils are intermediary functions until versions are aligned (Hub practitioner-app support may always need
// this, however)

// TODO: this can be removed when all FHIR functionality is migrated to R4 standard
export function fhirObservationSTU3ToR4Converter(
  resource: fhir3.Observation,
): void {
  // convert context to encounter
  if (resource.context) {
    (resource as fhir4.Observation).encounter =
      resource.context as fhir4.Reference;
    delete resource.context;
  }

  // convert category from a single object to an array
  // we seem to be handling this in existing models as an array,
  // so only convert on the way to connect, if necessary (not on the way back)
  if (resource.category && !Array.isArray(resource.category)) {
    resource.category = [resource.category];
  }

  // valueAttachment is not available in R4, but returns in draft 5; use an extension for now as substitution
  // (see https://www.hl7.org/fhir/r4/versions.html#extensions, URI can be used to re-migrate later when it
  // returns to spec)
  // NOTE: this assumes only one component will exist like this in a given observation (which should be true)
  // This handles attachments (images) with files as well as URLs, with the file binary support specifically intended
  // for sending files to EHRs for submission (S3FileService handles signed URLs for patient-submitted files for IRIS
  // observations)
  const valueAttachmentComponent = resource.component?.find(
    (component) =>
      component.valueAttachment?.url || component.valueAttachment?.data,
  );

  if (valueAttachmentComponent) {
    const attachmentExtension = valueAttachmentComponent.valueAttachment?.url
      ? {
          url: valueAttachmentConversionExtensionURI,
          valueAttachment: {
            url: valueAttachmentComponent.valueAttachment.url,
          },
        }
      : {
          url: valueAttachmentConversionExtensionURI,
          valueAttachment: {
            data: valueAttachmentComponent.valueAttachment.data,
          },
        };

    resource.extension = [
      ...(resource.extension ? resource.extension : []),
      attachmentExtension,
    ];
    const attachmentUrl = valueAttachmentComponent.valueAttachment?.url;
    valueAttachmentComponent.valueString =
      attachmentUrl ||
      `See file for extension URI ${valueAttachmentConversionExtensionURI}`;
    delete valueAttachmentComponent.valueAttachment;
  }
}
// TODO: this can be removed when all FHIR functionality is migrated to R4 standard
export function fhirObservationR4ToSTU3Converter(
  resource: fhir4.Observation,
): void {
  // convert encounter to context
  if (resource.encounter) {
    (resource as fhir3.Observation).context =
      resource.encounter as fhir3.Reference;
    delete resource.encounter;
  }

  // valueAttachment is not available in R4, returns in draft 5; use an extension for now
  // as substitution (see https://www.hl7.org/fhir/r4/versions.html#extensions, URI can be used
  // to re-migrate later when it returns to spec)
  // NOTE: this assumes only one component will exist like this in a given observation (which should be true)
  // This does not handle (or expect) binary file data (from either remote EHRs or IRIS), so only URL valueString
  // is catered for
  const valueAttachmentExtension = resource.extension.find(
    (extension) => extension.url === valueAttachmentConversionExtensionURI,
  );
  if (valueAttachmentExtension?.valueAttachment?.url) {
    const valueAttachmentComponent = resource.component.find(
      (component) =>
        component.valueString === valueAttachmentExtension.valueAttachment.url,
    );
    // if the extension exists, and a component with matching valueString does too, restore the valueAttachment
    // to the STU3 component and remove the valueString substitute (the extension can stay, it won't hurt anything)
    if (valueAttachmentComponent) {
      (valueAttachmentComponent as fhir3.ObservationComponent).valueAttachment =
        valueAttachmentExtension.valueAttachment as fhir3.Attachment;
      delete valueAttachmentComponent.valueString;
    }
  }
}
