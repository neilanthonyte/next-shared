// external
import { NextFunction, Request, Response } from "express";

// team submodules
import { Session } from "next-shared/src/models/Session";

// string to provide meaningful reason the request was rejected
export type MiddlewareAuthRule = (
  session: Session,
  req: Request,
) =>
  | boolean
  | string
  | Promise<boolean>
  | Promise<string>
  | Promise<(...args: any[]) => boolean>;

// TODO - Rewrite this. The logic regarding the valuation of true and string is going to cause unwanted errors.
/**
 * Provide multiple chains of rules, at least one chain must fully match for the request to be allowed.
 */
export function rules(
  ...ruleChains: MiddlewareAuthRule[][]
): (req: Request, res: Response, next?: NextFunction) => void {
  return (req: Request, res: Response, next?: NextFunction): void => {
    const session: Session = (req as any).session;
    let lastStrError = null;

    for (const ruleChain of ruleChains) {
      // iterate all rule chains
      let chainPassed = true;

      for (const rule of ruleChain) {
        // iterate all rules in chain
        // execute rule
        let ruleRes;
        try {
          // rule is a function
          ruleRes = rule(session, req);
        } catch (e) {
          ruleRes = e.message;
        }
        if (ruleRes !== true) {
          // rule failed, store error & move onto the next chain

          if (typeof ruleRes === "string") {
            lastStrError = ruleRes;
          }

          chainPassed = false;
          break; // try next chain
        }
      }

      if (chainPassed) {
        // we have access
        if (next) {
          next();
        }
        return;
      }

      // try next chain
    }

    // we have tried all chains, nothing passed, show access denied error
    if (lastStrError !== null) {
      if (next === null) {
        throw new Error(lastStrError);
      }
      res.status(401).json({ error: lastStrError });
      return;
    }
    if (next === null) {
      throw new Error(lastStrError);
    }
    res.status(401).json({ error: "Unauthorized" });
  };
}
