const { TokenTypes, Tokenizer } = require('./Tokenizer');

class Parser {
  parse(input) {
    this.input = input;
    this.tokenizer = new Tokenizer(input);
    this.lookahead = this.tokenizer.getNextToken();

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

  BinaryExpression(leftRule, rightRule, operatorType1, operatorType2) {
    let left = leftRule();

    while (
      this.lookahead &&
      (this.lookahead.type === operatorType1 ||
        this.lookahead.type === operatorType2)
    ) {
      const operator = this.eat(this.lookahead.type).value;
      left = {
        type: 'BinaryExpression',
        operator,
        left,
        right: rightRule(),
      };
    }

    return left;
  }

  /**
   * Expression
   *    = Term (("+" / "-") Term)*
   */
  Expression() {
    return this.BinaryExpression(
      () => this.Term(),
      () => this.Term(),
      TokenTypes.ADDITION,
      TokenTypes.SUBTRACTION
    );
  }

  /**
   * Term
   *    = Factor (("*" / "/") Factor)*
   */
  Term() {
    return this.BinaryExpression(
      () => this.Factor(),
      () => this.Factor(),
      TokenTypes.MULTIPLICATION,
      TokenTypes.DIVISION
    );
  }

  /**
   * Factor
   *    = Primary ("^" Factor)*
   */
  Factor() {
    return this.BinaryExpression(
      () => this.Primary(),
      () => this.Factor(),
      TokenTypes.EXPONENTIATION
    );
  }

  /**
   * Primary
   *    = ParenthesizedExpression
   *    / UnaryExpression
   *    / FunctionExpression
   *    / NUMBER
   */
  Primary() {
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
    return {
      type: 'Number',
      value: Number(token.value),
    };
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
   *    = "-" Factor
   */
  UnaryExpression() {
    this.eat(TokenTypes.SUBTRACTION);
    return {
      type: 'UnaryExpression',
      value: this.Factor(),
    };
  }

  /**
   * FunctionExpression
   *    = IDENTIFIER ParenthesizedExpression
   */
  FunctionExpression() {
    const token = this.eat(TokenTypes.IDENTIFIER);
    return {
      type: 'Function',
      name: token.value,
      value: this.ParenthesizedExpression(),
    };
  }
}

module.exports = { Parser };
