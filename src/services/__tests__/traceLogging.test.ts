/* eslint-disable @typescript-eslint/no-empty-function */
import * as Sinon from "sinon";

import { traceLogging } from "next-shared/src/util/traceLogging";
import { delay } from "next-shared/src/util/delay";

test("Logs when method is called on a decorated class", () => {
  const logger = Sinon.spy();
  @traceLogging("TestService", { customLogFunction: logger })
  class TestService {
    constructor() {}

    public testMethod() {
      return 1;
    }
  }

  const testService = new TestService();

  testService.testMethod();

  expect(logger.calledOnceWithExactly("testMethod(): 1")).toBe(true);
});

test("Logs multiple method calls with appropriate names", () => {
  const logger = Sinon.spy();
  @traceLogging("TestService", { customLogFunction: logger })
  class TestService {
    public testMethod() {
      return 1;
    }

    public otherMethod() {
      return 1;
    }
  }

  const testService = new TestService();

  testService.testMethod();
  testService.otherMethod();
  testService.testMethod();

  expect(logger.calledThrice).toBe(true);
  expect(logger.getCall(0).calledWith("testMethod(): 1")).toBe(true);
  expect(logger.getCall(1).calledWith("otherMethod(): 1")).toBe(true);
  expect(logger.getCall(2).calledWith("testMethod(): 1")).toBe(true);
});

test("Function output is not written if the function returns undefined", () => {
  const logger = Sinon.spy();
  @traceLogging("TestService", { customLogFunction: logger })
  class TestService {
    public testMethod() {}
  }

  const testService = new TestService();

  expect(testService.testMethod()).toBe(undefined);
  expect(logger.calledOnceWithExactly("testMethod()")).toBe(true);
});

test("Displays all arguments passed to method in log line", () => {
  const logger = Sinon.spy();
  @traceLogging("TestService", { customLogFunction: logger })
  class TestService {
    public testMethod(a: number, b: number, d: string, e: any) {
      return 1;
    }
  }

  const testService = new TestService();

  expect(testService.testMethod(532, 6, "hello world", null)).toBe(1);

  expect(
    logger.calledOnceWithExactly('testMethod(532, 6, "hello world", null): 1'),
  ).toBe(true);
});

test("Displays argument returned from method in log line", () => {
  const logger = Sinon.spy();
  @traceLogging("TestService", { customLogFunction: logger })
  class TestService {
    public testMethod() {
      return {
        age: 26,
        name: "John Smith",
      };
    }
  }

  const testService = new TestService();

  expect(testService.testMethod()).toEqual({ age: 26, name: "John Smith" });
  expect(
    logger.calledOnceWithExactly(
      'testMethod(): {"age":26,"name":"John Smith"}',
    ),
  ).toBe(true);
});

test("Shows [Query builder] if function returns a qb", () => {
  const logger = Sinon.spy();
  @traceLogging("TestService", { customLogFunction: logger })
  class TestService {
    public testMethod() {
      const fakeQueryBuilder = {
        then: () => {},
        client: () => {},
        and: () => {},
      };

      return fakeQueryBuilder;
    }
  }

  const testService = new TestService();

  testService.testMethod();
  expect(logger.calledOnceWithExactly("testMethod(): [Query builder]")).toBe(
    true,
  );
});

test("Shows appropriate stringified value for return value", () => {
  const circularJson: any = {
    a: 1,
    b: "abc",
    c: null,
  };
  circularJson.c = circularJson;

  const testValues = [
    [1, "1"],
    [123, "123"],
    [0.5, "0.5"],
    ["Hello world", '"Hello world"'],
    // [undefined, "undefined"], //this behaves differently for return value
    [() => {}, "[Function]"],
    [{ a: 123, b: "abc" }, '{"a":123,"b":"abc"}'],
    [circularJson, "[object Object]"],
  ];

  testValues.forEach((testValue) => {
    const logger = Sinon.spy();
    @traceLogging("TestService", { customLogFunction: logger })
    class TestService {
      public method1() {
        return testValue[0];
      }
    }

    const testService = new TestService();

    testService.method1();

    expect(logger.calledOnceWithExactly("method1(): " + testValue[1])).toBe(
      true,
    );
  });
});

test("Shows appropriate stringified arg values", () => {
  const circularJson: any = {
    a: 1,
    b: "abc",
    c: null,
  };
  circularJson.c = circularJson;

  const testValues = [
    [1, "1"],
    [123, "123"],
    [0.5, "0.5"],
    ["Hello world", '"Hello world"'],
    [undefined, "undefined"],
    [() => {}, "[Function]"],
    [{ a: 123, b: "abc" }, '{"a":123,"b":"abc"}'],
    [circularJson, "[object Object]"],
  ];

  testValues.forEach((testValue) => {
    const logger = Sinon.spy();
    @traceLogging("TestService", { customLogFunction: logger })
    class TestService {
      public method1(arg1: any) {}
    }

    const testService = new TestService();

    testService.method1(testValue[0]);

    expect(logger.calledOnceWithExactly(`method1(${testValue[1]})`)).toBe(true);
  });
});

test("Truncates long stringified values at 200 chars", () => {
  const logger = Sinon.spy();
  @traceLogging("TestService", { customLogFunction: logger })
  class TestService {
    public method1() {
      return "a".repeat(350);
    }
  }

  const testService = new TestService();

  testService.method1();

  // note: the " at the begining is intentional, we are truncating the JSON value, not the string value
  expect(
    logger.calledOnceWithExactly(
      `method1(): "${"a".repeat(199)}... [Value truncated]`,
    ),
  ).toBe(true);
});

test("Logs twice for async values, on call and on resolution", async () => {
  const logger = Sinon.spy();
  @traceLogging("TestService", { customLogFunction: logger })
  class TestService {
    public async asyncMethod(): Promise<string> {
      await delay(5);
      return "done";
    }
  }

  const testService = new TestService();

  const retVal = await testService.asyncMethod();

  expect(retVal).toBe("done");
  expect(logger.calledTwice).toBe(true);
  expect(logger.getCall(0).args[0]).toMatch(
    /^asyncMethod\(\) \[[0-9]{4}\]: \(pending\)$/,
  );
  expect(logger.getCall(1).args[0]).toMatch(
    /^asyncMethod\(\) \[[0-9]{4}\]: "done"$/,
  );
});

test("Logs when sync method throws an error", () => {
  const logger = Sinon.spy();
  @traceLogging("TestService", { customLogFunction: logger })
  class TestService {
    public throwingMethod() {
      throw new Error("Test error");
    }
  }

  const testService = new TestService();

  try {
    testService.throwingMethod();
  } catch {}

  expect(
    logger.calledOnceWithExactly("throwingMethod(): Threw error: Test error"),
  ).toBe(true);
});

test("Logs when async method throws an error", async () => {
  const logger = Sinon.spy();
  @traceLogging("TestService", { customLogFunction: logger })
  class TestService {
    public async asyncThrowingMethod() {
      await delay(5);
      throw new Error("Test error");
    }
  }

  const testService = new TestService();

  try {
    await testService.asyncThrowingMethod();
  } catch {}

  expect(logger.calledTwice).toBe(true);
  expect(logger.getCall(0).args[0]).toMatch(
    /^asyncThrowingMethod\(\) \[[0-9]{4}\]: \(pending\)$/,
  );
  expect(logger.getCall(1).args[0]).toMatch(
    /^asyncThrowingMethod\(\) \[[0-9]{4}\]: Threw error: Test error$/,
  );
});
