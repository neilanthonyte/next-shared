import { ICreditCard } from "../types/ICreditCard";

export const generateBlankCreditCardForGateway = (
  gatewayId: string,
): ICreditCard => ({
  gatewayId,
  cardNumberLast4: null,
  cardType: null,
  expirationDate: null,
  nameOnCard: null,
  paymentToken: null,
});
