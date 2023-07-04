import { injectable, inject } from "inversify";
import * as Sentry from "@sentry/node";

import { traceLogging } from "../util/traceLogging";
import { IConfig } from "../IoC/config";

export interface ILoggingService {
  init(): void;
  logError(e: Error): void;
}

@traceLogging("LoggingService")
@injectable()
export class LoggingService implements ILoggingService {
  public readonly loggingEnabled: boolean;

  constructor(@inject("config") private _config: IConfig) {
    this.loggingEnabled = this._config.sentryEnvironment !== "local";
  }

  public init() {
    if (!this.loggingEnabled) {
      return;
    }

    Sentry.init({
      dsn: this._config.sentryDsn,
      environment: this._config.sentryEnvironment,
      integrations(integrations: any[]) {
        return integrations.filter(
          (integration) => integration.name !== "Breadcrumbs",
        );
      },
    });
  }

  public logError(e: Error) {
    Sentry.captureException(e);
  }
}
