/**
 * Returns the next-connect facade resourceId value for a given tenantId, ehrId and resourceType
 *
 * @param tenantId
 * @param resourceType
 * @param ehrId
 * @returns string
 */
export function connectResourceIdFacadeValue(
  tenantId: string,
  resourceType: string,
  ehrId: string,
): string {
  return `${tenantId}_${resourceType.toLowerCase()}_${ehrId}`;
}
