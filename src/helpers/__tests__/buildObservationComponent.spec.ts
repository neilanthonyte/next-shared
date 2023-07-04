import {
  buildBooleanObservationComponent,
  buildIntegerObservationComponent,
  buildQuantityObservationComponent,
  buildStringObservationComponent,
} from "../buildObservationComponent";
import {
  loincOrgURI,
  observationComponentDisplayNameExtensionUrl,
  observationComponentRawCodeExtensionUrl,
} from "../constants";

describe("buildObservationComponent", () => {
  const loinc = "test-loinc";
  const displayName = "test-displayName";

  describe("buildStringObservationComponent", () => {
    it("builds a string observation component when supplied with a string value", () => {
      const value = "test-string";
      const expected = {
        extension: [
          {
            url: observationComponentRawCodeExtensionUrl,
            valueString: loinc,
          },
          {
            url: observationComponentDisplayNameExtensionUrl,
            valueString: displayName,
          },
        ],
        code: {
          coding: [
            {
              system: loincOrgURI,
              code: loinc,
            },
          ],
        },
        valueString: value,
      };

      const result = buildStringObservationComponent(loinc, displayName, value);
      expect(result).toEqual(expected);
    });

    it("returns null when supplied with undefined", () => {
      const value: undefined = undefined;

      const result = buildStringObservationComponent(loinc, displayName, value);
      expect(result).toBeNull();
    });

    it("returns null when supplied with null", () => {
      const value: null = null;

      const result = buildStringObservationComponent(loinc, displayName, value);
      expect(result).toBeNull();
    });
  });

  describe("buildBooleanObservationComponent", () => {
    it("builds a boolean observation component when supplied with a boolean value", () => {
      const value = true;
      const expected = {
        extension: [
          {
            url: observationComponentRawCodeExtensionUrl,
            valueString: loinc,
          },
          {
            url: observationComponentDisplayNameExtensionUrl,
            valueString: displayName,
          },
        ],
        code: {
          coding: [
            {
              system: loincOrgURI,
              code: loinc,
            },
          ],
        },
        valueBoolean: value,
      };

      const result = buildBooleanObservationComponent(
        loinc,
        displayName,
        value,
      );
      expect(result).toEqual(expected);
    });

    it("returns null when supplied with undefined", () => {
      const value: undefined = undefined;

      const result = buildBooleanObservationComponent(
        loinc,
        displayName,
        value,
      );
      expect(result).toBeNull();
    });

    it("returns null when supplied with null", () => {
      const value: null = null;

      const result = buildBooleanObservationComponent(
        loinc,
        displayName,
        value,
      );
      expect(result).toBeNull();
    });
  });

  describe("buildIntegerObservationComponent", () => {
    it("builds an integer observation component when supplied with a numerical value", () => {
      const value = 23;
      const expected = {
        extension: [
          {
            url: observationComponentRawCodeExtensionUrl,
            valueString: loinc,
          },
          {
            url: observationComponentDisplayNameExtensionUrl,
            valueString: displayName,
          },
        ],
        code: {
          coding: [
            {
              system: loincOrgURI,
              code: loinc,
            },
          ],
        },
        valueInteger: value,
      };

      const result = buildIntegerObservationComponent(
        loinc,
        displayName,
        value,
      );
      expect(result).toEqual(expected);
    });

    it("returns null when supplied with NaN", () => {
      const value: number = NaN;

      const result = buildIntegerObservationComponent(
        loinc,
        displayName,
        value,
      );
      expect(result).toBeNull();
    });

    it("returns null when supplied with infinity", () => {
      const value: number = Infinity;

      const result = buildIntegerObservationComponent(
        loinc,
        displayName,
        value,
      );
      expect(result).toBeNull();
    });

    it("returns null when supplied with undefined", () => {
      const value: undefined = undefined;

      const result = buildIntegerObservationComponent(
        loinc,
        displayName,
        value,
      );
      expect(result).toBeNull();
    });

    it("returns null when supplied with null", () => {
      const value: null = null;

      const result = buildIntegerObservationComponent(
        loinc,
        displayName,
        value,
      );
      expect(result).toBeNull();
    });
  });

  describe("buildQuantityObservationComponent", () => {
    it("builds a quantity observation component when supplied with a numerical value", () => {
      const value: fhir4.Quantity = {
        value: 23,
      };

      const expected = {
        extension: [
          {
            url: observationComponentRawCodeExtensionUrl,
            valueString: loinc,
          },
          {
            url: observationComponentDisplayNameExtensionUrl,
            valueString: displayName,
          },
        ],
        code: {
          coding: [
            {
              system: loincOrgURI,
              code: loinc,
            },
          ],
        },
        valueQuantity: value,
      };

      const result = buildQuantityObservationComponent(
        loinc,
        displayName,
        value,
      );
      expect(result).toEqual(expected);
    });

    it("returns null when supplied with a non-finite Quantity value", () => {
      const value: fhir4.Quantity = {
        value: NaN,
      };

      const result = buildQuantityObservationComponent(
        loinc,
        displayName,
        value,
      );
      expect(result).toBeNull();
    });

    it("returns null when supplied with a completely empty Quantity", () => {
      const value: fhir4.Quantity = {};

      const result = buildQuantityObservationComponent(
        loinc,
        displayName,
        value,
      );
      expect(result).toBeNull();
    });

    it("returns null when supplied with undefined", () => {
      const value: undefined = undefined;

      const result = buildQuantityObservationComponent(
        loinc,
        displayName,
        value,
      );
      expect(result).toBeNull();
    });
  });
});
