import { IPaydockCharge } from "../types/PaydockTypes";

export const createMockPaydockCharge = (
  amount: number,
  reference: string,
): IPaydockCharge => ({
  external_id: "foo",
  __v: 1,
  _id: "foo",
  amount: amount,
  company_id: "foo",
  created_at: "foo",
  currency: "foo",
  reference: reference,
  updated_at: "foo",
  user_id: "foo",
  one_off: true,
  archived: false,
  status: "foo",
  customer: null, // HACK
  transactions: null, // HACK
});
