import { NextFunction, Request, Response } from "express";

import { SocketPermissionDenied } from "next-shared/src/helpers/errorTypes";

import { Session } from "../models/Session";
import { container } from "../IoC/sharedContainer";

export type TUnsubscribeFunction = () => void;
export type TOnDataFunction<T = any> = (data: T) => void;

type TRulesFunc = (req: Request, res: Response, next?: NextFunction) => void;

// keep track of decorated endpoints
const endpoints = new Map<string, { constructor: any; rules?: TRulesFunc }>(); // endpoint name -> endpoint class
const actions = new Map<
  any,
  Map<string, { funcName: string; rules?: TRulesFunc }>
>(); // endpoint class -> action name -> action function name

/**
 * This is the `@syncController("hc")` decorator
 */
export function syncController(controllerName: string, rules?: TRulesFunc) {
  return (constructor: any) => {
    endpoints.set(controllerName, { constructor, rules });

    return constructor;
  };
}

/**
 * This is the `@syncAction("tick")` decorator
 */
export function syncAction(actionName: string, rules?: TRulesFunc) {
  return (target: any, propertyKey: string) => {
    // target is the endpoint controller
    // this line only happens if it is the first action on the controller
    if (!actions.has(target.constructor)) {
      actions.set(target.constructor, new Map());
    }

    const actionsMap = actions.get(target.constructor);
    actionsMap.set(actionName, { funcName: propertyKey, rules });

    return target;
  };
}

export function getSyncController(endpointName: string) {
  return endpoints.get(endpointName);
}

/**
 * The gets called every time a socket connects to a new `syncAction`
 *
 * Based on the metadata, this constructs and configures an instance of the endpoint,
 * executes rules specified on the endpoint, calls the action function, and then returns the unsubscribe function
 */
export async function callSyncAction(
  endpointName: string,
  actionName: string,
  onData: TOnDataFunction,
  actionParameters: { [key: string]: any },
  session?: Session,
): Promise<TUnsubscribeFunction> {
  const controller = getSyncController(endpointName);
  if (!controller?.constructor) {
    console.warn(
      `invalid controller, no constructor (endpointName: ${endpointName}, session: ${session})`,
      actionName,
      actionParameters,
    );
    throw new Error(
      `Invalid syncAction controller (endpointName: ${endpointName})`,
    );
  }
  const instanceOfController = container.resolve(controller.constructor) as any;
  const actionFunction = actions.get(controller.constructor).get(actionName);

  // execute rules
  // this is a complete mutilation of the rules function
  // designed to be "api compatible" with express middleware

  // rules for controller
  if (controller.rules) {
    try {
      await controller.rules(
        {
          session: session || null,
          // hack - to support the middleware auth rules that assume an express request object
          params: actionParameters || {}, // empty objects are the express default
          query: actionParameters || {}, // empty objects are the express default
        } as any,
        {} as any,
        null,
      );
    } catch (e) {
      throw new SocketPermissionDenied(e);
    }
  }

  // rules for action
  if (actionFunction.rules) {
    try {
      await actionFunction.rules(
        {
          session: session || null,
          // hack - to support the middleware auth rules that assume an express request object
          params: actionParameters || {}, // empty objects are the express default
          query: actionParameters || {}, // empty objects are the express default
        } as any,
        {} as any,
        null,
      );
    } catch (e) {
      throw new SocketPermissionDenied(e);
    }
  }

  // assign the session to the endpoint class (base class supports override session)
  instanceOfController.useOverrideSession = true;
  if (session) {
    instanceOfController.overrideSession = session;
  }

  // call the `syncAction` function on the endpoint
  const unsubFunc = instanceOfController[actionFunction.funcName](
    actionParameters,
    onData,
  ) as TUnsubscribeFunction;

  if ((unsubFunc as any).then !== undefined) {
    throw new Error(
      `returned a promise, sync endpoints should not be async (${endpointName}.${actionName})`,
    );
  }

  if (typeof unsubFunc !== "function") {
    throw new Error(
      `Sync endpoint did not return a 'handle unsubscribe' function (${endpointName}.${actionName})`,
    );
  }

  return unsubFunc;
}
