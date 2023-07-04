export interface ICmsSubscription {
  uuid: string;
  description: string;
  price: number;
  frequency: number;
  interval: "day" | "week" | "month" | "year";
  length?: number; // number of payments before stopping the subscription
}
