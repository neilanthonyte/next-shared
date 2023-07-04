import { MedicalResourceType } from "../../../types/types";
import { IMetricDefinition } from "../IMetricDefinition";

// https://s.details.loinc.org/LOINC/69730-0.html?sections=Comprehensive

export const patientNoteLOINC = "69730-0";
export const patientNoteDisplayName = "Note to patient";

const noteToPatientDefinition: IMetricDefinition = {
  type: MedicalResourceType.NoteToPatient,
  displayName: patientNoteDisplayName,
  category: "survey",

  components: [
    {
      codes: [
        patientNoteLOINC, // "Instructions"
      ],
      displayName: "",
    },
  ],
};

export default noteToPatientDefinition;
