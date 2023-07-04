export interface IMetricDefinition {
  type: string; // "observation:BloodPressure" matches up with a MedicalResourceType
  displayName: string; // "Blood pressure"

  // category.coding[0].code must match
  category: string; // "vital-signs"

  // at least one component must match code
  components: Array<{
    // any of these codes can be found, they will be converted back to the first item
    // and the original stored as an extension
    codes: string[]; // ["8459-0", "8459-1", "8459-3"]
    displayName: string; // "Systolic"
  }>;
}
