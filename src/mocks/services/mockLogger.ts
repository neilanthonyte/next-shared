import { ILogger } from "../../services/Logger";

/**
 * Mocked Logger for testing. Use
 * mockImplementation if specific function is needed.
 */
export const mockLogger: ILogger = {
  target: "console",
  log: jest.fn(),
  debug: jest.fn(),
  error: jest.fn(),
  warn: jest.fn(),
  end: jest.fn(),
  on: jest.fn(),
  logger: console,
};
