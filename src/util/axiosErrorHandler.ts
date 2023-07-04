import { ILogger } from "../services/Logger";
import { INetworkRequestArgs } from "../types/INetworkRequestArgs";

/**
 * This is a basic error handler for Axios requests.  It is based on the example JS function from
 * https://axios-http.com/docs/handling_errors, with an added thrown exception option and some
 * rudimentary sanitisation (clearing out request, config, headers) hinging on the args.preserveError
 * property (in keeping with existing implementations using this INetworkRequestArgs type). The
 * displayErrorConfig boolean will log error.config if true (and is false by default).
 *
 * This is intended primarily for back-end use where Axios requests are made.
 *
 * @param error
 * @param serviceName
 * @param args
 * @param throwException
 * @param displayErrorConfig
 * @param logger - Optionally use an ILogger instead of the console.
 */
export function axiosErrorHandler(
  error: any,
  serviceName: string,
  args: INetworkRequestArgs,
  throwException: boolean = true,
  displayErrorConfig: boolean = true,
  logger?: ILogger,
): void {
  // if an optional logger is passed in, then use it instead of console log
  const errorLogger = logger ?? console;

  errorLogger.error("Http error response for request", {
    serviceName,
    args,
    error: {
      message: error?.message,
      response: {
        data: error?.response?.data,
        status: error?.response?.status,
        headers: error?.response?.headers,
      },
      request: displayErrorConfig ? error?.config : null,
    },
  });
  // if this is true, modify the error to remove potentially sensitive info
  if (args.preserveError) {
    error.config = {};
    error.request = {};
    if (error.response) {
      error.response.request = {};
      error.response.config = {};
      // this only contains response data, but remove it anyway
      error.response.headers = {};
    }
  }

  // if not already thrown (no response), throw raw error here (or error.message, if
  // preserveError is true)
  if (throwException) {
    if (args.preserveError) {
      throw new Error(error.message);
    }
    throw error;
  }
}
