const { toRPN } = require('./shunting-yard-algorithm');

const input = '1 + 2 * 3 - 4';
const result = toRPN(input);
console.log(result); // 1 2 3 * + 4 -
