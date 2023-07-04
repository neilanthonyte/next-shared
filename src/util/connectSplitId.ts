import { retrieveReferenceResourceId } from "./retrieveReferenceResourceId";

export interface ISplitResource {
  /**
   * The tenantId that next-connect will use to determine which EHR tenant
   * to make the request
   */
  tenantId?: string;
  /**
   * fhir Resource type, like Patient
   */
  resourceType: string;
  /**
   * the actual Id of the resource for the EHR. (i.e. for IRIS
   * if this is "55", then you can make fhir patient request like Patient/55 )
   */
  ehrId: string;
  existingPath: string | null;
}

export type TConnectSplitResource = Required<ISplitResource>;

/**
 * Given a next-connect resource reference URL, or just the resource ID
 * (in tenant_resourceType_resourceId format), this function will parse the ID
 * into tenantId, resourceType, and ehrId; if the parameter value is a URL, it
 * will also return the existing path (sans the resourceId).
 *
 * @param connectResourceId
 * @returns { tenantId: string; resourceType: string; ehrId: string; existingPath: string | null; }
 */
export const connectSplitId = (
  // can also take a URL
  connectResourceId: string,
): TConnectSplitResource => {
  // de-structuring here so we can do some type inference
  const { tenantId, ...rest } = tryAndSplitConnectId(connectResourceId);

  if (!tenantId) {
    throw new Error(`Unable to parse id '${connectResourceId}'`);
  }

  return { tenantId, ...rest };
};

// TODO write some unit tests for the following
/**
 * Given a next-connect resource reference URL, or just the resource ID
 * (in tenant_resourceType_resourceId format), this function will parse the ID
 * into tenantId, resourceType, and ehrId; if the parameter value is a URL, it
 * will also return the existing path (sans the resourceId).
 *
 * @param resourceId
 * @returns { tenantId: string; resourceType: string; ehrId: string; existingPath: string | null; }
 */
export const tryAndSplitConnectId = (
  // can also take a URL
  resourceId: string,
): ISplitResource => {
  if (!resourceId) {
    throw new Error("Resource id cannot be empty");
  }
  const { referenceId, existingPath } = retrieveReferenceResourceId(resourceId);

  const [ehrId, resourceType, tenantId] = referenceId.split("_").reverse();

  return { tenantId, resourceType, ehrId, existingPath };
};
