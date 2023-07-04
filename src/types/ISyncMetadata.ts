import { SimpleEventEmitter } from "../lib/SimpleEventEmitter";

// used to tell SyncModule where & what to connect to

export enum EServiceNames {
  Main = "main",
  Actions = "actions",
}
export interface ISyncMetadata<T = any> {
  // T = return type of parseData
  endpoint: string; // "checklists"
  action: string; // "taskSummary"
  parameters: { [key: string]: any }; // { date: "25-02-2019" }
  unseralizeData?: (data: any) => T; // extract data,
  mockData?: any;
  emitter?: SimpleEventEmitter;
  /** The name of the service to connect to. Next-Services is assumed when empty */
  serviceName?: EServiceNames;
}
