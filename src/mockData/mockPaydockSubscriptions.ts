import { mockPatients } from "next-shared/src/mockData/mockPatients";
import { IPaydockSubscription } from "next-shared/src/types/PaydockTypes";

export const mockPaydockSubscription: IPaydockSubscription =
  mockPatients[0].subscriptions[0];

export const mockPaydockSubscriptions: { [x: string]: IPaydockSubscription[] } =
  {
    [mockPatients[0].patientId]: [mockPaydockSubscription],
  };
