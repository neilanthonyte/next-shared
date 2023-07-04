import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
} from "class-validator";

/**
 * This is a class validator that behaves like @IsIn, but it validates against array of readonly values.
 * IsIn does not.
 */
export const IsInReadonly = <TConstantType = string>(
  validValues: readonly TConstantType[],
  validationOptions?: ValidationOptions,
) => {
  return (object: Object, propertyName: string) => {
    registerDecorator({
      name: "isInReadonly",
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [validValues],
      validator: {
        validate: (value: TConstantType, args: ValidationArguments) => {
          const [readOnlyValuesToTest] = args.constraints;
          if (readOnlyValuesToTest.includes(value)) {
            return true;
          }
          return false;
        },
        defaultMessage: (args: ValidationArguments) =>
          `$value is not in ${JSON.stringify(validValues)}`,
      },
    });
  };
};
