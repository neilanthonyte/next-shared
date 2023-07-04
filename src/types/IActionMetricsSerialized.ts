export interface IActionMetricsSerialized {
  outstanding: number;
  raisedToday: number;
  solvedToday: number;
}

export interface IActionMetricsByLocationId {
  [locationId: string]: IActionMetricsSerialized;
}
