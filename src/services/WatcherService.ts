import { inject, injectable } from "inversify";
import _ from "lodash";

import { IIPCService } from "next-shared/src/services/IPCService";
import {
  TOnDataFunction,
  TUnsubscribeFunction,
} from "next-shared/src/util/dataSync";

export interface IWatcherService {
  retrieveAndWatch<T>(
    key: string,
    dataRetrieveFunc: () => Promise<T>,
    onData: TOnDataFunction<T>,
  ): TUnsubscribeFunction;
  triggerWatchers(key: string): void;
}

@injectable()
export class WatcherService implements IWatcherService {
  constructor(@inject("IPCService") private _ipcService: IIPCService) {}

  public retrieveAndWatch<T>(
    key: string,
    dataRetrieveFunc: () => Promise<T>,
    onData: TOnDataFunction<T>,
  ): TUnsubscribeFunction {
    let latestData: null | T = null;

    const handleNewData = () => {
      dataRetrieveFunc()
        .then((newData) => {
          if (_.isEqual(newData, latestData)) {
            // data has not changed, abort
            return;
          }

          latestData = newData;
          onData(latestData);
        })
        .catch(console.error);
    };

    // subscribe for changes to (this) item
    // when data changes, fetch again and call onData
    // only send changes if this is deeply different to the last data
    this._ipcService.broadcast.on("watch_" + key, handleNewData);

    // load initial data
    handleNewData();

    // return unsubscribe function to stop listening for changes
    return () => {
      this._ipcService.broadcast.off("watch_" + key, handleNewData);
    };
  }

  public triggerWatchers(key: string): void {
    this._ipcService.broadcast.emit("watch_" + key);
  }
}
