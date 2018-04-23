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

export function filterNodesInScopeByHasSelector(
  nodes: NodeList,
  selector: string
): Node[] {
  if (selector.trim().slice(0, 1) === '>') {
    let selectorWithoutDirect = selector
      .trim()
      .slice(1)
      .trim();
    return Array.from(nodes).filter(node => {
      return Array.from((<Element>node).children).some(child => {
        return child.matches(selectorWithoutDirect);
      });
    });
  }

  return Array.from(nodes).filter(node => {
    return (<Element>node).querySelector(selector);
  });
}
