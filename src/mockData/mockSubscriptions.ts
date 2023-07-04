import { ICmsSubscription } from "next-shared/src/types/ICmsSubscription";

export const mockSubscriptions: ICmsSubscription[] = [
  {
    uuid: "subscription-0",
    description: "Gold membership",
    price: 120,
    interval: "month",
    frequency: 1,
    length: null,
  },
  {
    uuid: "subscription-1",
    description: "Silver membership",
    price: 100,
    interval: "month",
    frequency: 1,
    length: null,
  },
  {
    uuid: "subscription-2",
    description: "Bronze membership",
    price: 80,
    interval: "week",
    frequency: 1,
    length: null,
  },
];
