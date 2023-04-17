const assert = require('assert').strict;
const { Parser } = require('./Parser');

const mathTests = [
  ['1', 1],
  [' 2 ', 2],
  ['1 + 2', 3],
  [' 1 + 2 ', 3],
  ['1 + 2 * 3', 7],
  ['(1 + 2) * 3', 9],
  ['5 - 2', 3],
  ['5 - 2 - 1', 2],
  ['12 / 2 / 3', 2],
  ['2 ^ 3 + 1', 9],
  ['-2 ^ 2', -4],
  ['(-2) ^ 2', 4],
  ['-2 ^ 2 + 1', -3],
  ['cos(0) + 3 * -4 / -2 ^ 2', 4],
];

const parser = new Parser();
let result;

for (const [expression, expected] of mathTests) {
  try {
    result = parser.parse(expression);
    assert.equal(result, expected);
  } catch (err) {
    const lines = '-'.repeat(process.stdout.columns);
    console.log(lines);
    console.log(`Expression failed: "${expression}"`);
    console.log(`Expected result: ${expected}`);
    console.log(`Actual result: ${result}`);
    console.log(lines);
    throw err;
  }
}

console.log('All tests passed! 🎉');
