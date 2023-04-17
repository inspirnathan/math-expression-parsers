const { generateAST } = require('./ast-with-sya');
const { NodeVisitor } = require('./node-visitor');

const input = '-1 + 2 * sin(3.14)';
const ast = generateAST(input);
const visitor = new NodeVisitor();
const result = visitor.visit(ast);
console.log(result); // -0.9968146941670264
