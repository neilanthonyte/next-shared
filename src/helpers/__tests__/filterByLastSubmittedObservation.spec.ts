import { cloneDeep, times } from "lodash";
import moment from "moment";
import { mockObservationsAlcohol } from "../../mockData/mockFhirPatientResources";
import { filterByLastSubmittedObservation } from "../filterByLastSubmittedObservation";

test("most recent obs descending", () => {
  const alcohol = mockObservationsAlcohol[0];
  const alcoholObs = times(5, (i) => {
    const cloned = cloneDeep(alcohol);
    cloned.meta.lastUpdated = moment().subtract(i, "day").toISOString();
    return cloned;
  });
  const latestAlcohol = filterByLastSubmittedObservation(alcoholObs);
  expect(latestAlcohol[0]).toEqual(alcoholObs[0]);
});

test("most recent obs ascending", () => {
  const alcohol = mockObservationsAlcohol[0];
  const alcoholObs = times(5, (i) => {
    const cloned = cloneDeep(alcohol);
    cloned.meta.lastUpdated = moment().add(i, "day").toISOString();
    return cloned;
  });
  const latestAlcohol = filterByLastSubmittedObservation(alcoholObs);
  expect(latestAlcohol[0]).toEqual(alcoholObs[alcoholObs.length - 1]);
});
