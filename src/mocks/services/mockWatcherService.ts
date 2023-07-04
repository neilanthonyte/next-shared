import { IWatcherService } from "../../services/WatcherService";

export const mockWatcherService: IWatcherService = {
  retrieveAndWatch: jest.fn(),
  triggerWatchers: jest.fn(),
};
