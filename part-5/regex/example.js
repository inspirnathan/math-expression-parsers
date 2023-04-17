const { Tokenizer } = require('./tokenizer-regex');

const printAllTokens = (input) => {
  const tokenizer = new Tokenizer(input);

  let token;
  while ((token = tokenizer.getNextToken())) {
    console.log(token);
  }
};

const input = '10 + 20 * 30 - 40';
printAllTokens(input);

/* OUTPUT:
{type: 'NUMBER', value: '10'}
{type: '+', value: '+'}
{type: 'NUMBER', value: '20'}
{type: '*', value: '*'}
{type: 'NUMBER', value: '30'}
{type: '-', value: '-'}
{type: 'NUMBER', value: '40'}
*/
