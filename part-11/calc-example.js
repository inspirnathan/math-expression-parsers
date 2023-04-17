const parser = require('./calc-parser');

const result = parser.parse('0.5 + 2.5 * 3 - cos(0)');

console.log(result); // 7
