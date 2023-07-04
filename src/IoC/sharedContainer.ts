import { Container } from "inversify";

export let container: Container;

// makes accessing loaded modules easy in integration tests
export function setContainer(newContainer: Container) {
  container = newContainer;
}
