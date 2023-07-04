export const generateEventNameForPatientMedicalResources = (
  patientId: string,
): string => {
  return `patient:resources:${patientId}`;
};

export const generateEventNameForPatientDemographics = (
  patientId: string,
): string => {
  return `patient:demographics:${patientId}`;
};

export const generateEventNameForEhrPatientDemographics = (
  ehrId: string,
  ehrPatientId: string,
): string => {
  return `ehrPatient:${ehrId}:${ehrPatientId}`;
};

export const generateEventNameForScopes = (scopeId: string): string => {
  return `scope:${scopeId}`;
};

export const generateEventNameForLocationScopes = (ehrId: string): string => {
  return `scopes:${ehrId}`;
};

export const generateEventNameForSessions = (sessionId: string): string => {
  return `session:${sessionId}`;
};

export const generateEventNameForPatientAppointments = (
  patientId: string,
): string => {
  return `appointments:patient:${patientId}`;
};

export const generateEventNameForEhrPatientAppointments = (
  ehrId: string,
  ehrPatientId: string,
): string => {
  return `appointments:${ehrId}:${ehrPatientId}`;
};
