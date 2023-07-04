export interface IOperationalDayTime {
  day: number;
  time: string;
}

export interface IOperationalPeriod {
  opening: IOperationalDayTime;
  closing: IOperationalDayTime;
}
