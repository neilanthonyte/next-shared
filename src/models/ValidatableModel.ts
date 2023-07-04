import { validate } from "class-validator";
import { ValidationError } from "../helpers/errorTypes";

/**
 * A class model that implements class validation. All data model should implement this
 */
export class ValidatableModel {
  /**
   * Validates current class and throw error if errors are encountered.
   * This is different from `AbstractValidator`'s `validate` in that it's an async function.
   * @throws {@link ValidationError} - Native validation errors can be found in ValidationError.errorInfo.validationErrors
   */
  public async validate(): Promise<void> {
    const errors = await validate(this);
    if (errors.length > 0) {
      throw new ValidationError("Validation failed", {
        class: this.constructor.name,
        method: "validateAsync",
        validationErrors: errors,
      });
    }
  }
}
