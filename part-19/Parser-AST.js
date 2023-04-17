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

    return this.Program();
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

    if (token && token.type != TokenTypes.PARENTHESIS_RIGHT) {
      return this.operators[token.value];
    }

    return 0;
  }

  /**
   * Program
   *    = StatementList
   */
  Program() {
    return {
      type: 'Program',
      body: this.StatementList(),
    };
  }

  /**
   * StatementList
   *    = Statement+
   */
  StatementList() {
    const statementList = [this.Statement()];

    while (this.lookahead !== null) {
      statementList.push(this.Statement());
    }

    return statementList;
  }

  /**
   * Statement
   *    = VariableStatement
   *    / PrintStatement
   *    / ExpressionStatement
   */
  Statement() {
    if (this.lookahead.type === TokenTypes.VAR) {
      return this.VariableStatement();
    }

    if (this.lookahead.type === TokenTypes.PRINT) {
      return this.PrintStatement();
    }

    return this.ExpressionStatement();
  }

  /**
   * VariableStatement
   *    = "var" IDENTIFIER "=" Expression ";"
   */
  VariableStatement() {
    this.eat(TokenTypes.VAR);
    const name = this.eat(TokenTypes.IDENTIFIER).value;
    this.eat(TokenTypes.ASSIGNMENT);
    const value = this.Expression();
    this.eat(TokenTypes.SEMICOLON);

    return {
      type: 'VariableStatement',
      name,
      value,
    };
  }

  /**
   * PrintStatement
   *    = "print" ParenthesizedExpression ";"
   */
  PrintStatement() {
    this.eat(TokenTypes.PRINT);
    const expression = this.ParenthesizedExpression();
    this.eat(TokenTypes.SEMICOLON);

    return {
      type: 'PrintStatement',
      value: expression,
    };
  }

  /**
   * ExpressionStatement
   *    = Expression ";"
   */
  ExpressionStatement() {
    const expression = this.Expression();
    this.eat(TokenTypes.SEMICOLON);

    return {
      type: 'ExpressionStatement',
      value: expression,
    };
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
   *    / VariableOrFunctionExpression
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
      return this.VariableOrFunctionExpression();
    }

    const token = this.eat(TokenTypes.NUMBER);

    return {
      type: 'Number',
      value: Number(token.value),
    };
  }

  /**
   * Infix
   *    = ("+" / "-" / "*" / "/" / "^") Expression
   */
  Infix(left, operatorType) {
    let token = this.eat(operatorType);
    let newPrec = this.operators[token.value];

    return {
      type: 'BinaryExpression',
      operator: token.value,
      left,
      right: this.Expression(
        token.type === TokenTypes.EXPONENTIATION ? newPrec - 1 : newPrec
      ),
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
   *    = "-" Expression
   */
  UnaryExpression() {
    this.eat(TokenTypes.SUBTRACTION);

    return {
      type: 'UnaryExpression',
      value: this.Expression(this.getPrecedence('unary')),
    };
  }

  /**
   * VariableOrFunctionExpression
   *    = FunctionExpression
   *    / Variable
   */
  VariableOrFunctionExpression() {
    const id = this.eat(TokenTypes.IDENTIFIER).value;

    if (this.lookahead.type === TokenTypes.PARENTHESIS_LEFT) {
      return this.FunctionExpression(id);
    }

    return this.Variable(id);
  }

  /**
   * Variable
   *    = IDENTIFIER
   */
  Variable(id) {
    return {
      type: 'Variable',
      name: id,
    };
  }

  /**
   * FunctionExpression
   *    = IDENTIFIER ParenthesizedExpression
   */
  FunctionExpression(id) {
    const expression = this.ParenthesizedExpression();

    return {
      type: 'Function',
      name: id,
      value: expression,
    };
  }
}

module.exports = { Parser };
