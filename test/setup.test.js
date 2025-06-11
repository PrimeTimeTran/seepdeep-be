// [ ] Test Python, JS, TS, Dart, C++, Java, TS, SQL languages work.
// [ ] Add enough methods such that each datatype is tested as an parameter in the invoked code.
//      int, double, string, map, list, etc
// [ ] Add tests return types. int, double, string, map, list, etc
// [ ] Add tests for API/Controllers
// [ ] Add tests for Models

// Resources
// https://github.com/goldbergyoni/javascript-testing-best-practices?tab=readme-ov-file#section-0%EF%B8%8F%E2%83%A3-the-golden-rule

import { test, expect } from 'vitest'

function sum(a, b) {
  return a + b
}

test('adds 1 + 2 to equal 3', () => {
  expect(sum(1, 2)).toBe(3)
})
