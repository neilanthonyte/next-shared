import { ICreditCard } from "./ICreditCard";
import { IPaydockSubscription } from "./PaydockTypes";

export interface IPatientPaymentsDetails {
  subscriptions: IPaydockSubscription[];
  creditCards: ICreditCard[];
}

export interface IPatientPaymentDetails {
  subscription: IPaydockSubscription;
  creditCard: ICreditCard;
}
