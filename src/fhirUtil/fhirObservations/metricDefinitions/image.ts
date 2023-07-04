import { MedicalResourceType } from "../../../types/types";
import { IMetricDefinition } from "../IMetricDefinition";

// category: imaging

/*
{
    "code": {
        "coding": [
            {
                "system": "http://loinc.org/",
                "code": "72170-4"
            }
        ]
    },
    "valueAttachment": {
      "url": "https://sydprodstorage.blob.core.windows.net/627aeb79-2222-4635-
      8afc-336fbd13c461/d19266ed-f81b-4a9b-8095-8aa572a62519"
    }
}
 */

export const imageLOINC = "72170-4";
export const imageLOINCText = "Photo";

const imageDefinition: IMetricDefinition = {
  type: MedicalResourceType.Image,
  displayName: "Image",
  category: "imaging",

  components: [
    {
      codes: [
        "72170-4", // "Photographic image"
      ],
      displayName: "Photographic image",
    },
  ],
};

export default imageDefinition;
