import { TFrequencies } from "./TFrequencies";

export enum TChecklistCmsTaskFrequency {
  Daily = "daily",
  Weekly = "weekly",
  Monthly = "monthly",
  Quarterly = "quarterly",
  Biannual = "biannual",
  Annual = "annual",
  Yearly = "yearly",
}

export const checklistCmsTaskFrequencyToMomentFrequency = new Map<
  TChecklistCmsTaskFrequency,
  TFrequencies
>([
  [TChecklistCmsTaskFrequency.Daily, TFrequencies.Day],
  [TChecklistCmsTaskFrequency.Weekly, TFrequencies.Week],
  [TChecklistCmsTaskFrequency.Monthly, TFrequencies.Month],
  [TChecklistCmsTaskFrequency.Quarterly, TFrequencies.Quarter],
  [TChecklistCmsTaskFrequency.Biannual, TFrequencies.Biannual],
  [TChecklistCmsTaskFrequency.Annual, TFrequencies.Annual],
  [TChecklistCmsTaskFrequency.Yearly, TFrequencies.Annual],
]);

export const nonDailyFrequencies = Object.values(
  TChecklistCmsTaskFrequency,
).filter(
  (frequency: TChecklistCmsTaskFrequency) =>
    frequency !== TChecklistCmsTaskFrequency.Daily,
);

export interface IChecklistCmsTaskFrequency {
  slug: TChecklistCmsTaskFrequency;
  title: string;
  duration: string;
}
