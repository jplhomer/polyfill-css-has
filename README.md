# CSS :has() Polyfill

```
.c-entry-content > div:has(>.e-image):nth-child(3n)

# regex against `:has()`
# create map of node results to the left of `:has`: `.c-entry-content > div`
# filter over the map, checking for existence of "has" selector: `.querySelector('> .e-image')
# execute any additional chained filters after :has(): `:nth-child(3n)` using JS?
```
