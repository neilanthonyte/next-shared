import { TPermissions } from "../types/permissions";
import { Session } from "../models/Session";
import { MiddlewareAuthRule } from "./rules";

/**
 * The Next Patient, fetched from the session or app.
 */
export const isPatient: MiddlewareAuthRule = (session, req) => {
  return !!session?.patient || "Session does not contain patient";
};

/**
 * The EHR Patient, fetched from the session or app.
 */
export const isEhrPatient: MiddlewareAuthRule = (session, req) => {
  return !!session?.ehrPatient || "Session does not contain EHR patient";
};

export const isStaffMember: MiddlewareAuthRule = (session, req) => {
  return (
    !!session?.staffMember?.staffMemberId ||
    "Session does not belong to a staff member"
  );
};

/**
 * A function maker that will return an auth rule
 * that limits by specific a set of tokens
 * @param trustedTokens
 */
export const makeHasTrustedTokensRule =
  (trustedTokens: string[]): MiddlewareAuthRule =>
  (session, req) => {
    const authHeader = req.headers?.["authorization"];
    if (!authHeader || !authHeader.startsWith("Bearer")) {
      return "Unauthorized";
    }
    const bearerToken = authHeader.substring("Bearer ".length);
    if (!trustedTokens?.includes(bearerToken)) {
      return "Unauthorized client";
    }
    return true;
  };

/**
 *
 * @param session
 * @param req
 */
export const isPathPatient: MiddlewareAuthRule = (session, req) => {
  // TODO - update this to the isAuthenticated rule.
  if (!(session instanceof Session)) {
    return "Invalid session";
  }
  const { patientId: pathPatientId } = req?.params || {};
  const { patientId: sessionPatientId } = session.patient || {};
  if (!sessionPatientId) {
    return "Session does not container a patient";
  }
  if (
    !sessionPatientId ||
    !pathPatientId ||
    sessionPatientId !== pathPatientId
  ) {
    return "Resource for this patient is forbidden to current user";
  }
  return true;
};

/**
 * Whether current session is a staff member with EHR association
 *
 */
export const isEhrStaffMember: MiddlewareAuthRule = (session, req) => {
  // TODO - update this to the isAuthenticated rule. will need to test all affected endpoint, so won't do in this ticket
  if (!(session instanceof Session)) {
    return "Invalid session";
  }

  if (!session.staffMember?.ehrId) {
    return "Resource requires a staff member which EHR";
  }
  return true;
};

/**
 * Whether the logged in user has admin permission
 * @param session
 * @param req
 */
export const isAdminStaff: MiddlewareAuthRule = (session, req) => {
  if (!session.permissions.includes(TPermissions.SystemAdmin)) {
    return "Permission denied. Resource requires admin privilege";
  }

  return true;
};
