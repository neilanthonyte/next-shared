import { unixTimestamp } from "next-shared/src/types/dateTypes";

export type articleSlug = string;

export interface IPrescribedArticle {
  articleSlug: articleSlug;
  datePrescribed: unixTimestamp;
  dateRead: unixTimestamp;
}
