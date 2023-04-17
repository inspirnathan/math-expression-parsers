const RPNEvaluator = (input) => {
  const stack = [];

  const handleToken = (token) => {
    if (!isNaN(parseFloat(token))) {
      stack.push(token);
      return;
    }

    const right = parseFloat(stack.pop());
    const left = parseFloat(stack.pop());

    switch (token) {
      case '+': // Addition
        stack.push(left + right);
        return;
      case '-': // Subtraction
        stack.push(left - right);
        return;
      case '*': // Multiplication
        stack.push(left * right);
        return;
      case '/': // Division
        stack.push(left / right);
        return;
      case '^': // Exponentiation
        stack.push(left ** right);
        return;
      default:
        throw new Error(`Invalid token: ${token}`);
    }
  };

  for (let i of input) {
    if (i === ' ') continue;

    handleToken(i);
  }

  return stack.pop();
};

module.exports = { RPNEvaluator };
