import { ICacheService } from "../../services/CacheService";

export const mockCacheService: ICacheService = {
  cache: jest.fn(),
  reheatCache: jest.fn(),
  cacheSerializable: jest.fn(),
  cacheJson: jest.fn(),
  purgeNamespace: jest.fn(),
  deleteItem: jest.fn(),
};
