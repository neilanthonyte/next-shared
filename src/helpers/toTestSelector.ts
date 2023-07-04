export function toTestSelector(
  name: string,
  attrName: string = "data-test",
): string {
  return `[${attrName}="${name}"]`;
}

export function selectDemo(
  componentName: string,
  scenarioName: string,
): string {
  return toTestSelector(`${componentName}-${scenarioName}`);
}

export function selectComponent(): string {
  return toTestSelector("component");
}

export function selectAction(actionName: string): string {
  return toTestSelector(actionName, "data-action");
}

export function selectAttribute(attrName: string): string {
  return `data-${attrName}`;
}
