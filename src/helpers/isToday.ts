import moment from "moment";

export const isToday = (date: string) => moment(date).isSame(moment(), "day");
