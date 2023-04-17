const parser = require('./calc-ast-parser');

const result = parser.parse('1 + 2 * 3');

console.log(result);
