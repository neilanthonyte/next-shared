import { parseHelixDocumentId } from "../parseHelixDocumentId";

describe("parseHelixDocumentId", () => {
  it("can split the ID into document type and document ID", () => {
    const mockDocumentId = "letter:12";
    const mockResult = parseHelixDocumentId(mockDocumentId);

    expect(mockResult).toHaveProperty("documentType", "letter");
    expect(mockResult).toHaveProperty("documentId", "12");
  });

  it("should throw error if document ID to parse is empty", () => {
    expect(() => parseHelixDocumentId(undefined)).toThrowError(
      "Document Id cannot be empty",
    );
  });

  it("should throw error if the document type is unrecognised", () => {
    expect(() => parseHelixDocumentId("a:b")).toThrowError(
      "Unknown document type: a",
    );
  });

  it("should throw error if document ID is in the wrong format", () => {
    const mockBadId1 = "letter:b:c:d:e";
    const mockBadId2 = "labResult:";

    expect(() => parseHelixDocumentId(mockBadId1)).toThrowError(
      `Invalid Helix document Id: ${mockBadId1}`,
    );
    expect(() => parseHelixDocumentId(mockBadId2)).toThrowError(
      `Invalid Helix document Id: ${mockBadId2}`,
    );
  });
});
