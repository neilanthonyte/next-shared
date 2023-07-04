import { ISyncMetadata } from "../types/ISyncMetadata";
import { TUnsubscribeFunction } from "../util/dataSync";

export interface IActiveSyncEndpoint {
  guid: string;
  syncMetadata: ISyncMetadata;
  unsubFunc: TUnsubscribeFunction;
}

export type TDeadSyncEndpoint = Omit<IActiveSyncEndpoint, "unsubFunc">;

/**
 * Encapsulates the currently active endpoints open on a socket.
 *
 * Ensures unsubscribe functions are always run in the same event loop iteration
 * as the record's deletion.
 */
export class ActiveSyncEndpointRecord {
  private _activeSyncEndpoints: Map<string, IActiveSyncEndpoint> = new Map();

  get size() {
    return this._activeSyncEndpoints.size;
  }

  has(guid: string) {
    return this._activeSyncEndpoints.has(guid);
  }

  add(endpoint: IActiveSyncEndpoint) {
    this._activeSyncEndpoints.set(endpoint.guid, endpoint);
  }

  /**
   * Removes the active sync endpoint with the associated guid and calls its unsubscribe function.
   * @param guid the id of the active endpoint to unsubscribe
   * @returns details of the removed endpoint, or null if not present
   */
  delete(guid: string): TDeadSyncEndpoint {
    const activeSyncEndpoint = this._activeSyncEndpoints.get(guid);

    if (!activeSyncEndpoint) {
      return null;
    }

    const { syncMetadata, unsubFunc } = activeSyncEndpoint;

    unsubFunc();
    this._activeSyncEndpoints.delete(guid);

    return {
      guid,
      syncMetadata,
    };
  }

  /**
   * Clears all active sync endpoints, and calls their unsubscribe functions.
   * @returns an array of the removed sync endpoints
   */
  clear(): TDeadSyncEndpoint[] {
    const activeSyncEndpoints = Array.from(this._activeSyncEndpoints.values());

    activeSyncEndpoints.forEach((endpoint) => endpoint.unsubFunc());
    this._activeSyncEndpoints.clear();

    return activeSyncEndpoints.map(({ guid, syncMetadata }) => ({
      guid,
      syncMetadata,
    }));
  }
}
