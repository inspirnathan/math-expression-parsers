const { Parser } = require('./Parser-AST');

const parser = new Parser();
const ast = parser.parse('var x = 1 + 2 * 3; print(x);');
console.dir(ast, { depth: null }); // log nested objects
