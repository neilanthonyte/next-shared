import { unixTimestamp } from "./dateTypes";

/**
 * A credit card stored against a user.
 */
export interface ICreditCard {
  paymentToken?: string;
  nameOnCard?: string; // "Samantha Washington"
  cardType?: string; // "visa"
  cardNumberLast4?: string;
  expirationDate?: string; // "10/2020"
  gatewayId?: string;
  createdAt?: unixTimestamp;
}

/** A card returned by the Paydock form */
export interface IProvisionalCreditCard {
  cardToken?: string;
  cardNumberLast4?: string;
  cardType?: string; // "visa"
}
