export const helixDocumentTypes = ["letter", "labResult"] as const;

export type THelixDocumentType = typeof helixDocumentTypes[number];
