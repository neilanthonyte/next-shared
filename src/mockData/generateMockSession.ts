import { currentUnixTimestamp } from "../helpers/currentUnixTimestamp";
import { ISession, Session } from "../models/Session";

/**
 * Generates a simpple empty mock session for testing. For
 * a more complete session suitable for integration tests with a Patient with
 * Fhir, consider using generatePatientSession.
 * @param sessionData - data to override the default session data.
 * @returns
 */
export const generateMockSession = (sessionData?: Partial<ISession>) => {
  const defaultSession: ISession = {
    sessionId: "mock_session_id",
    createdAt: currentUnixTimestamp(),
    expiresAt: currentUnixTimestamp() + 60 * 60 * 1000,
    patient: null,
    ehrPatient: null,
    availableLocations: [],
    permissions: [],
  };
  return Session.unserialize({
    ...defaultSession,
    ...sessionData,
  });
};
