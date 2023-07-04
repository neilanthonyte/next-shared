export interface INetworkRequestArgs {
  url: string;
  method: "get" | "post" | "put" | "delete" | "patch";
  params?: Record<string, string | string[]> | URLSearchParams;
  data?: any;
  retryAttempts?: number;
  responseType?: "arraybuffer" | "document" | "json" | "text" | "stream";
  // will throw the error returned from the network request untouched
  preserveError?: boolean;
  discardError?: boolean;
  allow404?: boolean;
  returnLocationHeader?: boolean;
}
