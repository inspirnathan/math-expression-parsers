const { evaluate } = require('./sya-with-unary');

const input1 = '-1';
const input2 = '(-1)';
const input3 = '1 + -2';
const input4 = '1 - -2';
const input5 = '-2 ^ 2';
const input6 = '(-2) ^ 2';

console.log(evaluate(input1)); // -1
console.log(evaluate(input2)); // -1
console.log(evaluate(input3)); // -1
console.log(evaluate(input4)); // 3
console.log(evaluate(input5)); // -4
console.log(evaluate(input6)); // 4
