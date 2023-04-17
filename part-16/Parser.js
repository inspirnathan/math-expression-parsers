const { TokenTypes, Tokenizer } = require('./Tokenizer');

class Parser {
  parse(input) {
    this.input = input;
    this.tokenizer = new Tokenizer(input);
    this.lookahead = this.tokenizer.getNextToken();
    this.operators = {
      '^': 5,
      unary: 4,
      '*': 3,
      '/': 3,
      '+': 2,
      '-': 2,
    };

    return this.Expression();
  }

  eat(tokenType) {
    const token = this.lookahead;

    if (token == null) {
      throw new SyntaxError(`Unexpected end of input, expected "${tokenType}"`);
    }

    if (token.type !== tokenType) {
      throw new SyntaxError(
        `Unexpected token: "${token.value}", expected "${tokenType}"`
      );
    }

    this.lookahead = this.tokenizer.getNextToken();

    return token;
  }

  getPrecedence(token) {
    if (token === 'unary') {
      return this.operators.unary;
    }

    if (token?.type) {
      return this.operators[token.value];
    }

    return 0;
  }

  trig(id, value) {
    switch (id) {
      case 'sin':
        return Math.sin(value);
      case 'cos':
        return Math.cos(value);
      case 'tan':
        return Math.tan(value);
      default:
        throw new Error(`Invalid operation: ${id}`);
    }
  }

  /**
   * Expression
   *    = Prefix (Infix)*
   */
  Expression(prec = 0) {
    let left = this.Prefix();

    while (prec < this.getPrecedence(this.lookahead)) {
      left = this.Infix(left, this.lookahead?.type);
    }

    return left;
  }

  /**
   * Prefix
   *    = ParenthesizedExpression
   *    / UnaryExpression
   *    / FunctionExpression
   *    / NUMBER
   */
  Prefix() {
    if (this.lookahead.type === TokenTypes.PARENTHESIS_LEFT) {
      return this.ParenthesizedExpression();
    }

    if (this.lookahead.type === TokenTypes.SUBTRACTION) {
      return this.UnaryExpression();
    }

    if (this.lookahead.type === TokenTypes.IDENTIFIER) {
      return this.FunctionExpression();
    }

    const token = this.eat(TokenTypes.NUMBER);
    return Number(token.value);
  }

  /**
   * Infix
   *    = ("+" / "-" / "*" / "/" / "^") Expression
   */
  Infix(left, operatorType) {
    let token = this.eat(operatorType);
    let newPrec = this.operators[token.value];
    switch (token.type) {
      case TokenTypes.ADDITION:
        return left + this.Expression(newPrec);
      case TokenTypes.SUBTRACTION:
        return left - this.Expression(newPrec);
      case TokenTypes.MULTIPLICATION:
        return left * this.Expression(newPrec);
      case TokenTypes.DIVISION:
        return left / this.Expression(newPrec);
      case TokenTypes.EXPONENTIATION:
        return left ** this.Expression(newPrec - 1);
    }
  }

  /**
   * ParenthesizedExpression
   *    = "(" Expression ")"
   */
  ParenthesizedExpression() {
    this.eat(TokenTypes.PARENTHESIS_LEFT);
    const expression = this.Expression();
    this.eat(TokenTypes.PARENTHESIS_RIGHT);
    return expression;
  }

  /**
   * UnaryExpression
   *    = "-" Expression
   */
  UnaryExpression() {
    this.eat(TokenTypes.SUBTRACTION);
    return -this.Expression(this.getPrecedence('unary'));
  }

  /**
   * FunctionExpression
   *    = IDENTIFIER ParenthesizedExpression
   */
  FunctionExpression() {
    const id = this.eat(TokenTypes.IDENTIFIER).value;
    const expression = this.ParenthesizedExpression();
    return this.trig(id, expression);
  }
}

module.exports = { Parser };
