import { EStandardSizes } from "next-shared/src/types/standardSizes";

export interface IActionableProps {
  stdSize?: EStandardSizes;
  onClick?: (...args: any[]) => any;
}
