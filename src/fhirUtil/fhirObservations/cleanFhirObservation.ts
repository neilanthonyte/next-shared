import _ from "lodash";

import { metricDefinitions } from "./metricDefinitions";
import { fhirUtil } from "../../fhirUtil";
import {
  observationComponentDisplayNameExtensionUrl,
  observationComponentRawCodeExtensionUrl,
  observationDisplayNameExtensionUrl,
  observationTypeExtensionUrl,
} from "../../helpers/constants";
import { FhirObservationUtil } from "../../fhirUtil/utilClasses/FhirObservationUtil";

// TODO: Write some tests for this

export function cleanFhirObservation(
  ogObservation: fhir3.Observation,
): fhir3.Observation[] {
  if (ogObservation.resourceType !== "Observation") {
    throw new Error("resource must be a fhir Observation");
  }
  if (!Array.isArray(ogObservation.component)) {
    throw new Error("Observation must have a component property");
  }

  if (
    fhirUtil(ogObservation).getExtension(observationTypeExtensionUrl) !== null
  ) {
    // observation already has a type extension, consider it clean
    return [ogObservation];
  }

  // get extract from observation
  const obsCategory = _.get(ogObservation, "category[0].coding[0].code");
  const obsComponentCodes = ogObservation.component.map(
    (x) => x.code.coding[0].code,
  );

  const includedMetricDefinitions = Object.keys(metricDefinitions)
    .map((key) => metricDefinitions[key]) // grab values
    .filter((x) => x.category === obsCategory) // categories MUST match exactly
    .filter((metricDefinition) =>
      // at least one possible code for this metric is in this observation
      metricDefinition.components.some(
        (metricCompoment) =>
          _.intersection(metricCompoment.codes, obsComponentCodes).length > 0,
      ),
    );

  const cleanObservations = includedMetricDefinitions.map(
    (metricDefinition) => {
      // create a new observation for each matching metricDefinition
      let observation: fhir3.Observation = { ...ogObservation };

      // TODO commenting this next statement but leaving here in case there is a reason for it
      // In the case of delegate appointment reason for visit, we do an update if there is a resource id
      // but that fails because we are changing the id here. Not sure why this was needed

      // if (observation.id) {
      //   // mutate the observation id, we have changed the observation
      //   observation.id = `${observation.id}-${metricDefinition.type}`;
      // }
      const ogObservationUtil = fhirUtil<FhirObservationUtil>(observation);

      // if missing, attach observation type, display name
      // NOTE: fhirUtil must be reinstantiated each time with the current observation value
      if (!ogObservationUtil.getMedicalResourceType()) {
        observation = fhirUtil<FhirObservationUtil>(observation).setExtension({
          url: observationTypeExtensionUrl,
          valueString: metricDefinition.type,
        });
      }

      // check if we already have a display name, so we don't override
      if (!ogObservationUtil.getDisplayName()) {
        observation = fhirUtil<FhirObservationUtil>(observation).setExtension({
          url: observationDisplayNameExtensionUrl,
          valueString: metricDefinition.displayName,
        });
      }

      observation.component = metricDefinition.components
        .map((metricDefinitionCompoment) => {
          // try and find this component in the ogObservation
          const ogComponent = ogObservation.component.find(
            (x) =>
              metricDefinitionCompoment.codes.indexOf(x.code.coding[0].code) !==
              -1,
          );

          // this metricDefinitionComponent did not exist on this component
          if (ogComponent === undefined) {
            return undefined;
          }

          const ogCode = _.get(ogComponent, "code.coding[0].code");
          let cleanedCompoment: fhir3.ObservationComponent = {
            ...ogComponent,
            code: {
              coding: [
                {
                  system: "http://loinc.org/", // enforce loinc
                  code: metricDefinitionCompoment.codes[0], // reset code to first (part of standardising)
                },
              ],
            },
          };

          // attach the original code as an extension
          cleanedCompoment = fhirUtil(cleanedCompoment).setExtension({
            url: observationComponentRawCodeExtensionUrl,
            valueString: ogCode,
          });

          // attach the display name to the component
          cleanedCompoment = fhirUtil(cleanedCompoment).setExtension({
            url: observationComponentDisplayNameExtensionUrl,
            valueString: metricDefinitionCompoment.displayName,
          });

          return cleanedCompoment;
        })
        .filter((x) => x !== undefined); // remove observation component entries that werent on the og component

      return observation;
    },
  );

  return cleanObservations;
}
