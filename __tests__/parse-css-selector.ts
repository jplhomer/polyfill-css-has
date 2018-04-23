import { getHasInnerSelector } from "../src/polyfill-css-has";

describe('Parse CSS selector', () => {
  it('returns the inner selector if there is one', () => {
    const results = getHasInnerSelector('.c-entry-content > div:has(> .e-video)');

    expect(results).toBe('> .e-video');
  })

  it('returns false if no :has is present', () => {
    expect(getHasInnerSelector('.c-entry-content > p')).toBeFalsy();
  })
})
