const { evaluate } = require('./sya-with-tokenizer');

const input = 'sin(3.14) * 1000 - 1';
const result = evaluate(input);
console.log(result); // 0.5926529164868282
