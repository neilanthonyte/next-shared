import { registerDecorator, ValidationArguments } from "class-validator";
import moment from "moment-timezone";

import { IOperationalPeriod } from "next-shared/src/types/IOperationalPeriod";
import { ILocationPlaces } from "next-shared/src/types/ILocationPlaces";
import { ITimezone } from "next-shared/src/types/ITimezone";
import { matchesMilitaryTime } from "../helpers/time";

const isValidOperationalDay = (day: number) => day >= 0 && day <= 6;

const isValidOperationalTime = (time: string) =>
  time.length === 4 && matchesMilitaryTime(time);

export function IsOpeningHoursValid() {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: "IsOpeningHoursValid",
      target: object.constructor,
      propertyName: propertyName,
      validator: {
        validate(value: ILocationPlaces, args: ValidationArguments) {
          const operationalPeriod = value.openingHours?.periods || value;

          if (!operationalPeriod || !Array.isArray(operationalPeriod)) {
            return false;
          }

          return operationalPeriod.every((op: IOperationalPeriod) => {
            if (!("open" in op) && !("close" in op)) {
              return false;
            }

            return (
              isValidOperationalDay(op.opening.day) &&
              isValidOperationalTime(op.opening.time) &&
              isValidOperationalDay(op.closing.day) &&
              isValidOperationalTime(op.closing.time)
            );
          });
        },
      },
    });
  };
}

export function IsTimezoneValid() {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: "timezoneValid",
      target: object.constructor,
      propertyName: propertyName,
      validator: {
        validate(value: ITimezone, args: ValidationArguments) {
          return !!value.timeZoneId && !!moment.tz.zone(value.timeZoneId);
        },
      },
    });
  };
}
