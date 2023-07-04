export interface IPaydockCustomer {
  _id?: string;
  token?: string; // token to create customer with
  created_at?: string; // "2016-12-22T10:36:08.171Z"
  updated_at?: string; // "2016-12-22T10:36:08.171Z";
  status?: "active";
  default_source?: string; // "585bac98e45b75bc368087b8";
  reference?: string;
  first_name?: string;
  last_name?: string;
  email?: string;
  phone?: string;
  payment_sources?: IPaydockPaymentSource[];
}

export interface IPaydockPaymentSource {
  _id?: string;
  status?: string; // "active" || "archived"
  address_line1?: string;
  address_line2?: string;
  address_city?: string;
  address_state?: string;
  address_country?: string; // "AU"
  address_postcode?: string;
  gateway_id?: string; // payment service
  card_name?: string; // customer name on card
  card_scheme?: string; // "visa"
  card_number_last4?: string; // "1234"
  card_number?: string;
  expire_month?: string;
  expire_year?: string;
  card_ccv?: string;
  created_at?: string;
}

export interface IPaydockSubscription {
  _id?: string;

  amount: number; // 10.00
  currency?: "AUD";
  reference?: string; // internal (spg) reference
  description?: string;

  customer_id?: string;
  customer?: IPaydockCustomer;

  schedule: {
    interval: "day" | "week" | "month" | "year";
    frequency: string; // "1" - number of 'interval's between charges
    start_date: string; // "2015-07-15T09:58:12.441Z"
    end_date?: string; // "2016-07-25T07:35:11Z"
    end_amount_after?: number;
    end_transactions?: number;

    first_assessment?: "2015-07-15T09:58:12.441Z";
    last_assessment?: "2015-07-15T09:58:19.120Z";
    next_assessment?: "2015-07-16T09:58:12.441Z";
    status?: string; // "complete"
    locked?: boolean;
    completed_count?: number;
    retry_count?: number;
  };

  status?: "active" | "expired" | "failed" | "deleted";

  created_at?: string; // "2015-07-15T09:58:16.269Z"

  updated_at?: "2015-07-15T10:01:30.978Z";
  archived?: boolean;
  statistics?: {
    total_collected_amount: number;
    successful_transactions: number;
  };
  gateway_type?: string;
  gateway_name?: string;
  gateway_mode?: string;
  gateway_id?: string;
}

export interface IPaydockTransaction {
  _id: string;
  amount: number;
  created_at: string;
  currency: string;
  status: string;
  type: string;
}

export interface IPaydockCharge {
  external_id: string;
  __v: number;
  _id: string;
  amount: number;
  company_id: string;
  created_at: string;
  currency: string;
  reference?: string;
  updated_at?: string;
  user_id: string;
  one_off: boolean;
  archived: boolean;
  status: string;
  customer: IPaydockCustomer;
  transactions: IPaydockTransaction[];
}
