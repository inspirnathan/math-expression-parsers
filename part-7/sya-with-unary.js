const { Tokenizer } = require('./tokenizer');

const operators = {
  u: {
    prec: 4,
    assoc: 'right',
  },
  '^': {
    prec: 4,
    assoc: 'right',
  },
  '*': {
    prec: 3,
    assoc: 'left',
  },
  '/': {
    prec: 3,
    assoc: 'left',
  },
  '+': {
    prec: 2,
    assoc: 'left',
  },
  '-': {
    prec: 2,
    assoc: 'left',
  },
};

const functionList = ['sin', 'cos', 'tan'];

const assert = (predicate) => {
  if (predicate) return;
  throw new Error('Assertion failed due to invalid token');
};

const isFunction = (token) => {
  return functionList.includes(token.toLowerCase());
};

const evaluate = (input) => {
  const opSymbols = Object.keys(operators);
  const stack = [];
  let output = [];

  const peek = () => {
    return stack.at(-1);
  };

  const addToOutput = (token) => {
    output.push(token);
  };

  const handlePop = () => {
    const op = stack.pop();

    if (op === '(') return;

    if (op === 'u') return -parseFloat(output.pop());

    if (isFunction(op)) {
      const poppedValue = output.pop();
      switch (op) {
        case 'sin':
          return Math.sin(poppedValue);
        case 'cos':
          return Math.cos(poppedValue);
        case 'tan':
          return Math.tan(poppedValue);
      }
    }

    const right = parseFloat(output.pop());
    const left = parseFloat(output.pop());

    switch (op) {
      case '+':
        return left + right;
      case '-':
        return left - right;
      case '*':
        return left * right;
      case '/':
        return left / right;
      case '^':
        return left ** right;
      default:
        throw new Error(`Invalid operation: ${op}`);
    }
  };

  const handleToken = (token) => {
    switch (true) {
      case !isNaN(parseFloat(token)):
        addToOutput(token);
        break;
      case isFunction(token):
        stack.push(token);
        break;
      case opSymbols.includes(token):
        const o1 = token;
        let o2 = peek();

        while (
          o2 !== undefined &&
          o2 !== '(' &&
          (operators[o2].prec > operators[o1].prec ||
            (operators[o2].prec === operators[o1].prec &&
              operators[o1].assoc === 'left'))
        ) {
          addToOutput(handlePop());
          o2 = peek();
        }
        stack.push(o1);
        break;
      case token === '(':
        stack.push(token);
        break;
      case token === ')':
        let topOfStack = peek();
        while (topOfStack !== '(') {
          assert(stack.length !== 0);
          addToOutput(handlePop());
          topOfStack = peek();
        }
        assert(peek() === '(');
        handlePop();
        topOfStack = peek();
        if (topOfStack && isFunction(topOfStack)) {
          addToOutput(handlePop());
        }
        break;
      default:
        throw new Error(`Invalid token: ${token}`);
    }
  };

  const tokenizer = new Tokenizer(input);
  let token;
  let prevToken = null;
  while ((token = tokenizer.getNextToken())) {
    if (
      token.value === '-' &&
      (prevToken === null ||
        prevToken.value === '(' ||
        opSymbols.includes(prevToken.value))
    ) {
      handleToken('u');
    } else {
      handleToken(token.value);
    }
    prevToken = token;
  }

  while (stack.length !== 0) {
    assert(peek() !== '(');
    addToOutput(handlePop());
  }

  return output[0];
};

module.exports = {
  evaluate,
};
