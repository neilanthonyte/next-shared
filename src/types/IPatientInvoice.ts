import { unixTimestamp } from "next-shared/src/types/dateTypes";

export interface IPatientInvoice {
  id: string;
  transactionDate: unixTimestamp;
  amountDue: number;
  patientEhrId: string;
  amount: number;
  gst: number;
  ehrId: string;
  cmsLocationSlug: string;
}
