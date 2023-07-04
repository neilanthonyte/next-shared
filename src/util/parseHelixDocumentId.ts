import {
  helixDocumentTypes,
  THelixDocumentType,
} from "../types/THelixDocumentType";

export const parseHelixDocumentId = (documentId: string) => {
  if (!documentId) {
    throw new Error("Document Id cannot be empty");
  }
  const [helixDocumentType, helixDocumentId, ..._extra] = documentId.split(":");

  if (!helixDocumentTypes.includes(helixDocumentType as THelixDocumentType)) {
    throw new Error(`Unknown document type: ${helixDocumentType}`);
  }

  if (!helixDocumentId || _extra.length > 0) {
    throw new Error(`Invalid Helix document Id: ${documentId}`);
  }
  return {
    documentId: helixDocumentId,
    documentType: helixDocumentType,
  };
};
