import moment from "moment";

export const isUpcoming = (date: string) =>
  moment(date).isAfter(moment().startOf("day"));
