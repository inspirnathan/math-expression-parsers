const { TokenTypes, Tokenizer } = require('./Tokenizer');

class SymbolTable {
  constructor() {
    this.symbolTable = {};
  }

  set(name, value) {
    this.symbolTable[name] = value;
  }

  get(name) {
    if (this.has(name)) {
      return this.symbolTable[name];
    }
  }

  has(name) {
    if (this.symbolTable.hasOwnProperty(name)) {
      return true;
    } else throw new Error(`${name} has not been declared.`);
  }
}

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
    this.symbolTable = new SymbolTable();

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
   * Program
   *    = StatementList
   */
  Program() {
    return this.StatementList();
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

    this.symbolTable.set(name, value);
  }

  /**
   * PrintStatement
   *    = "print" ParenthesizedExpression ";"
   */
  PrintStatement() {
    this.eat(TokenTypes.PRINT);
    const expression = this.ParenthesizedExpression();
    this.eat(TokenTypes.SEMICOLON);
    console.log(expression);
  }

  /**
   * ExpressionStatement
   *    = Expression ";"
   */
  ExpressionStatement() {
    const expression = this.Expression();
    this.eat(TokenTypes.SEMICOLON);
    return expression;
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
    return this.symbolTable.get(id);
  }

  /**
   * FunctionExpression
   *    = IDENTIFIER ParenthesizedExpression
   */
  FunctionExpression(id) {
    const expression = this.ParenthesizedExpression();
    return this.trig(id, expression);
  }
}

module.exports = { Parser };
