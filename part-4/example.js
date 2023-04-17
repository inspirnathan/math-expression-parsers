const { evaluate } = require('./sya-evaluate');

const input = '1 + 2 * 3 - 4';
const result = evaluate(input);
console.log(result); // 3
