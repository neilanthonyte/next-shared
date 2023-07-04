import { ICreditCard } from "next-shared/src/types/ICreditCard";

import { mockNextLocations } from "./mockLocations";
import { mockPatients } from "./mockPatients";

export const mockCreditCard: ICreditCard = {
  nameOnCard: mockPatients[0].getDisplayName(),
  cardType: "visa",
  cardNumberLast4: "0000",
  expirationDate: "5/2027",
  paymentToken: mockPatients[0].paydockCustomerId,
  gatewayId: mockNextLocations[0].paydockServiceId,
};

export const mockCreditCardExpired: ICreditCard = {
  nameOnCard: mockPatients[2].getDisplayName(),
  cardType: "visa",
  cardNumberLast4: "0000",
  expirationDate: "5/2020",
  paymentToken: mockPatients[2].paydockCustomerId,
  gatewayId: mockNextLocations[1].paydockServiceId,
};

export const mockPatientCreditCards: { [x: string]: ICreditCard[] } = {
  [mockPatients[0].patientId]: [
    mockCreditCard,
    {
      ...mockCreditCard,
      paymentToken: `${mockPatients[0].paydockCustomerId}-2`,
      gatewayId: mockNextLocations[1].paydockServiceId,
    },
  ],
  [mockPatients[1].patientId]: null,
  [mockPatients[2].patientId]: [mockCreditCardExpired],
};
