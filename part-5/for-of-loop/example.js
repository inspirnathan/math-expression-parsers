const { tokenizer } = require('./tokenizer-foreach');

const input = '10 + 20';
const result = tokenizer(input);
console.log(result); // ['10', '+', '20']
