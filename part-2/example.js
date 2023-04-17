const { RPNEvaluator } = require('./rpn-evaluator');

// Infix form:   1 + 2 * 3 - 4
// Postfix form: 1 2 3 * + 4 -

const result = RPNEvaluator('1 2 3 * + 4 -');
console.log(result); // 3
