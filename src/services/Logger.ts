import { injectable } from "inversify";
import {
  createLogger,
  format,
  transports,
  Logger as IWinstonLogger,
} from "winston";
import "winston-daily-rotate-file";

import ecsFormat from "@elastic/ecs-winston-format";

const logTargets = [
  "node",
  "react",
  "cloudwatch",
  "file",
  "console",
  "elastic",
] as const;

export type TLogTarget = typeof logTargets[number];
export interface ILoggerConfig {
  target: TLogTarget;
}

/**
 * These are the common properties that should be available in every log.
 * TODO - more work to be done for this to be automatically set during request or activation.
 */
export interface ILogProperties {
  class?: string;
  function?: string;
  endpoint?: string;
  correlationId?: string;
}

export interface ILogger {
  logProperties?: ILogProperties;
  /**
   * There's magic get/set on this.
   * Changing this will change the underlying logger.
   */
  target: TLogTarget;
  log: (message: string, meta?: any) => void;
  debug: (message: string, meta?: any) => void;
  error: (message: string, meta?: any) => void;
  warn: (message: string, meta?: any) => void;
  /**
   * Proxy method to Nodejs.WriteableStream end() function.
   * Ends the logging process and flush the stream.
   * Useful for outputting to file.
   */
  end: (...args: any[]) => void;
  /**
   * Subscribe to winston loggers' event.
   * Useful even is "finish"
   */
  on: (event: string | symbol, cb: (...args: any[]) => void) => void;
  /**
   * return the underlying logger (readonly)
   */
  readonly logger: IWinstonLogger | Console;
}

/**
 * Stringify replacer. Example from MDN
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Errors/Cyclic_object_value#circular_references
 * @returns
 */
const getCircularReplacer = () => {
  const seen = new WeakSet();
  return (_key: any, value: any) => {
    if (typeof value === "object" && value !== null) {
      if (seen.has(value)) {
        return;
      }
      seen.add(value);
    }
    return value;
  };
};

const defaultLogTarget = (process.env?.LOG_MODE ?? "cloudwatch") as TLogTarget;

const logDirectory = process.env?.LOG_DIRECTORY ?? "";

@injectable()
export class Logger implements ILogger {
  private _logger;

  private _target: TLogTarget;

  public logProperties?: ILogProperties;

  constructor(target: TLogTarget = defaultLogTarget) {
    // check if log target is valid
    if (!logTargets.includes(target)) {
      throw new Error("Invalid log target!");
    }

    this._target = target;
    this._logger = this.getLogger(target);
    this.logProperties = {};
  }

  public log(message: string, meta?: any) {
    this._logger.info(message, meta);
  }

  public debug(message: string, meta?: any) {
    this._logger.debug(message, meta);
  }

  public error(message: string, meta?: any) {
    this._logger.error(message, meta);
  }

  public warn(message: string, meta?: any) {
    this._logger.warn(message, meta);
  }

  public end(...args: any[]) {
    if (this._target === "console") {
      return;
    }
    (this._logger as IWinstonLogger).end(...args);
  }

  public on(event: string, cb: (...args: any[]) => void) {
    if (this._target === "console") {
      return;
    }
    (this._logger as IWinstonLogger).on(event, cb);
  }

  get target() {
    return this._target;
  }

  set target(target: TLogTarget) {
    this._target = target;
    this._logger = this.getLogger(target);
  }

  get logger() {
    return this._logger;
  }

  private getLogger(target: TLogTarget) {
    if (target === "console") {
      return console;
    }
    if (target === "file") {
      /**
       * Winston Transport for outputting to file.
       * You generally won't use this unless running locally.
       */
      const combinedFileTransport = new transports.DailyRotateFile({
        format: format.combine(format.timestamp(), format.json()),
        filename: `${logDirectory}combined-%DATE%.log`,
        datePattern: "YYYY-MM-DD",
      });

      /**
       * Winston Transport for outputting errors to file.
       * You generally won't use this unless running locally.
       */
      const errorFileTransport = new transports.DailyRotateFile({
        format: format.combine(format.timestamp(), format.json()),
        filename: `${logDirectory}error-%DATE%.log`,
        datePattern: "YYYY-MM-DD",
        level: "error",
      });
      return createLogger({
        transports: [combinedFileTransport, errorFileTransport],
      });
    }

    if (target === "node") {
      /**
       * Winston Transport for node apps
       * formatted console out with colors and timestamp
       */
      const nodeTransport = new transports.Console({
        format: format.combine(
          format.colorize({
            all: true,
          }),
          format.timestamp(),
          format.printf(({ timestamp, level, message, ...meta }) => {
            const metaData = {
              ...(this.logProperties || {}),
              ...(meta || {}),
            };
            return `${timestamp} ${level}: "${message}." \n${JSON.stringify(
              metaData,
              getCircularReplacer(),
              " ",
            )}\n`;
          }),
        ),
      });
      return createLogger({
        transports: [nodeTransport],
      });
    }
    if (target === "cloudwatch") {
      const logObjectFormat = format(({ level, message, ...meta }) => ({
        message,
        level,
        meta,
        ...(this.logProperties || {}),
      }));
      /**
       * Winston Transport for CloudWatch (JSON)
       */
      const cloudWatchTransport = new transports.Console({
        format: format.combine(
          logObjectFormat(),
          format.json(),
          format.errors({ stack: true }),
        ),
      });
      return createLogger({
        transports: [cloudWatchTransport],
      });
    }

    // default - elastic format (logstash)
    const formatWithLogProperties = format((info) => ({
      ...info,
      ...(this.logProperties || {}),
    }));
    return createLogger({
      format: format.combine(
        formatWithLogProperties(),
        ecsFormat({ convertReqRes: true }),
      ),
      transports: [new transports.Console()],
    });
  }
}
