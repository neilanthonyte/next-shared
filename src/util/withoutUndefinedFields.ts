/**
 * Returns a new object with undefined fields recursively removed.
 *
 * NB. undefined fields in arrays are *not* removed so that array length semantics are preserved.
 */
export const withoutUndefinedFields = <T>(theThing: T): T => {
  if (typeof theThing !== "object" || theThing === null) {
    // a primitive value, return it
    return theThing;
  }

  if (Array.isArray(theThing)) {
    // @ts-expect-error TS2322 TODO remove once TS fixes its Array.isArray() type narrowing
    return theThing.map(withoutUndefinedFields);
  }

  const cloned = { ...theThing };

  for (const key in cloned) {
    const value = cloned[key];

    if (value === undefined) {
      delete cloned[key];
    } else {
      cloned[key] = withoutUndefinedFields(value);
    }
  }

  return cloned;
};
