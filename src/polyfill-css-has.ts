export function getHasInnerSelector(selector: string): string | Boolean {
  const matches = /:has\((.*)\)/.exec(selector);

  if (!matches) {
    return false;
  }

  return matches[1];
}

export function getNodesInCurrentScope(
  dom: Document,
  selector: string
): NodeList {
  const currentScopeSelector = getCurrentScopeSelector(selector);

  return dom.querySelectorAll(currentScopeSelector);
}

function getCurrentScopeSelector(selector: string): string {
  return selector.slice(0, selector.indexOf(':has('));
}
