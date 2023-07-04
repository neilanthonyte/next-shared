export function serializeProp(value: any): any {
  // serialize all items within array
  if (Array.isArray(value)) {
    return value.map(serializeProp);
  }

  // check if this property is a model object
  if (
    typeof value === "object" &&
    value !== null &&
    typeof value.filterSensitiveData === "function" &&
    typeof value.serialize === "function"
  ) {
    // we have a model object, filter, serialise & send
    return value.filterSensitiveData().serialize();
  }

  // don't modify value
  return value;
}
