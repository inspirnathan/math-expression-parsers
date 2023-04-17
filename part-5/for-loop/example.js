const { tokenizer } = require('./tokenizer-for-loop');

const input = '10 + 20';
const result = tokenizer(input);
console.log(result); // ['10', '+', '20']
