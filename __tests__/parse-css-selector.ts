import { JSDOM } from 'jsdom';

import {
  getHasInnerSelector,
  getNodesInCurrentScope,
  filterNodesInScopeByHasSelector
} from '../src/polyfill-css-has';

describe('Parse CSS selector', () => {
  it('returns the inner selector if there is one', () => {
    const results = getHasInnerSelector(
      '.c-entry-content > div:has(> .e-video)'
    );

    expect(results).toBe('> .e-video');
  });

  it('returns false if no :has is present', () => {
    expect(getHasInnerSelector('.c-entry-content > p')).toBeFalsy();
  });
});

describe('Get nodes in current scope', () => {
  const {
    window: { document }
  } = new JSDOM(`
    <!DOCTYPE html>
    <div class="c-entry-content">
    <p>Hello</p>
    <div>
      <figure class="e-image"></figure>
    </div>
    <p>Hey</p>
  `);

  const results = getNodesInCurrentScope(
    document,
    '.c-entry-content > div:has(> .e-image)'
  );

  expect(results.length).toBe(1);

  const div = <HTMLElement>results[0];
  expect(div.tagName).toBe('DIV');
});

describe('Filter nodes in scope by has selector', () => {
  let document;

  beforeEach(() => {
    const { window } = new JSDOM(`
      <!DOCTYPE html>
      <div class="c-entry-content">
      <p>Hello</p>
      <div>
        <figure class="e-image"></figure>
      </div>
      <div>
        <blockquote>Hi there</blockquote>
      </div>
      <p>Hey</p.
    `);

    document = window.document;
  });

  it('filters by non-direct selectors', () => {
    const selector = '.c-entry-content > div:has(.e-image)';
    const nodes = getNodesInCurrentScope(document, selector);
    const hasSelector = getHasInnerSelector(selector);
    const filteredNodes = filterNodesInScopeByHasSelector(
      nodes,
      hasSelector as string
    );

    expect(filteredNodes.length).toBe(1);
  });

  it('filters by direct selectors', () => {
    const selector = '.c-entry-content > div:has(> .e-image)';
    const nodes = getNodesInCurrentScope(document, selector);
    const hasSelector = getHasInnerSelector(selector);
    const filteredNodes = filterNodesInScopeByHasSelector(
      nodes,
      hasSelector as string
    );

    expect(filteredNodes.length).toBe(1);
  });
});
