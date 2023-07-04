import axios from "axios";
import { inject, injectable } from "inversify";

import { axiosErrorHandler } from "../util/axiosErrorHandler";
import { traceLogging } from "../util/traceLogging";
import { delay } from "../util/delay";
import { INetworkRequestArgs } from "../types/INetworkRequestArgs";
import { IConfig } from "../IoC/config";
import { BadRequestError } from "../helpers/errorTypes";
import { ILogger } from "./Logger";

export interface ICommsNetworkService {
  makeCommsRequest(args: INetworkRequestArgs): Promise<any>;
}

@traceLogging("CommsNetworkService")
@injectable()
export class CommsNetworkService implements ICommsNetworkService {
  constructor(
    @inject("config") private _config: IConfig,
    @inject("Logger") private _logger: ILogger,
  ) {}

  public async makeCommsRequest(args: INetworkRequestArgs): Promise<any> {
    try {
      const res = await axios.request({
        url: this._config.commsUrl + args.url,
        method: args.method,
        params: args.params,
        data: args.data,
        withCredentials: true,
        responseType: args.responseType || "json",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${this._config.commsBearerToken}`,
        },
      });
      return res.data;
    } catch (e) {
      if (args.discardError) {
        return;
      }

      if (args.allow404 && e.response?.status === 404) {
        return null;
      }

      if (e.response?.status === 400) {
        // handle this status specifically like spg-comms-client originally did
        throw new BadRequestError(e.response.data.error);
      }

      if (args.retryAttempts && args.retryAttempts > 0) {
        // error, retry
        const newArgs = {
          ...args,
          retryAttempts: args.retryAttempts - 1,
        };

        // wait before retrying
        await delay(500);

        // try again
        return this.makeCommsRequest(newArgs);
      }

      axiosErrorHandler(
        e,
        this.constructor.name,
        args,
        true,
        false,
        this._logger,
      );
    }
  }
}
