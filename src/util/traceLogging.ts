// note: this module must be highly optimised

import debugFactory from "debug";

export interface ITraceLoggingOptions {
  customLogFunction?: (msg: string) => void;
}

// to be used as a decorator
// usage: @traceLogging("QueryService")
export function traceLogging(
  serviceName: string,
  options: ITraceLoggingOptions = {},
): (target: any) => void {
  /* istanbul ignore next */
  const debug =
    options.customLogFunction || debugFactory(`next:${serviceName}:trace`);

  return (target: { prototype: any }) => {
    const debugEnabled = (debug as any).enabled;
    if (debugEnabled === false) {
      // for performance, don"t both monkey patching functions if we aren"t using the output
      /* istanbul ignore next */
      return;
    }

    Object.getOwnPropertyNames(target.prototype).forEach((key) => {
      if (
        Object.getOwnPropertyDescriptor(target.prototype, key).get !== undefined
      ) {
        // property is getter, DO NOT CALL (would execute code)
        return;
      }

      const clsMethod = target.prototype[key];
      if (typeof clsMethod !== "function" || key === "constructor") {
        return;
      }

      // monkey patch with logging
      target.prototype[key] = function (...args: any[]) {
        const logLinePrefix = `${key}(${args
          .map((x) => stringifyValue(x))
          .join(", ")})`;

        let retVal: any;

        try {
          retVal = clsMethod.apply(this, args);
        } catch (err) {
          debug(`${logLinePrefix}: Threw error: ${err.message}`);
          throw err;
        }

        if (retVal === undefined) {
          // no return value
          // we have a value, log sync format
          debug(`${logLinePrefix}`);
          return retVal;
        }

        if (retVal === null) {
          // value, but checking for .then on null will crash
          debug(`${logLinePrefix}: null`);
          return retVal;
        }

        if (typeof retVal.then !== "function") {
          // not a promise
          // we have a value, log sync format
          debug(`${logLinePrefix}: ${stringifyValue(retVal)}`);
          return retVal;
        }

        // detect knex objects (calling .then on them executes them)
        if ((retVal as any).client && (retVal as any).and) {
          // we have a query builder
          debug(`${logLinePrefix}: [Query builder]`);
          return retVal;
        }

        // promise val, log async format
        const rand = Math.random().toString().split(".")[1].substring(0, 4);
        debug(`${logLinePrefix} [${rand}]: (pending)`);

        return retVal
          .then((res: any) => {
            debug(`${logLinePrefix} [${rand}]: ${stringifyValue(res)}`);
            return res;
          })
          .catch((err: Error) => {
            debug(`${logLinePrefix} [${rand}]: Threw error: ${err.message}`);
            throw err;
          });
      };
    });
  };
}

function stringifyValue(val: any) {
  if (typeof val === "function") {
    return "[Function]";
  }

  if (val === undefined) {
    return "undefined";
  }

  try {
    const jsonVal = JSON.stringify(val);
    if (jsonVal.length > 200) {
      return jsonVal.substring(0, 200) + "... [Value truncated]";
    }

    return jsonVal;
  } catch (e) {
    return val.toString();
  }
}
