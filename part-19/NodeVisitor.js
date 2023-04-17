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

class NodeVisitor {
  constructor() {
    this.symbolTable = new SymbolTable();
  }

  visit(node) {
    switch (node.type) {
      case 'Program':
        return this.visitProgram(node);
      case 'VariableStatement':
        return this.visitVariableStatement(node);
      case 'PrintStatement':
        return this.visitPrintStatement(node);
      case 'ExpressionStatement':
        return this.visitExpressionStatement(node);
      case 'Variable':
        return this.visitVariable(node);
      case 'BinaryExpression':
        return this.visitBinaryExpression(node);
      case 'UnaryExpression':
        return this.visitUnaryExpression(node);
      case 'Function':
        return this.visitFunction(node);
      case 'Number':
        return this.visitNumber(node);
    }
  }

  visitProgram(node) {
    const results = [];

    for (const statementNode of node.body) {
      results.push(this.visit(statementNode));
    }

    return results;
  }

  visitVariableStatement(node) {
    this.symbolTable.set(node.name, this.visit(node.value));
  }

  visitPrintStatement(node) {
    console.log(node.value);
  }

  visitExpressionStatement(node) {
    return this.visit(node.value);
  }

  visitVariable(node) {
    return this.symbolTable.get(node.name);
  }

  visitBinaryExpression(node) {
    switch (node.operator) {
      case '+':
        return this.visit(node.left) + this.visit(node.right);
      case '-':
        return this.visit(node.left) - this.visit(node.right);
      case '*':
        return this.visit(node.left) * this.visit(node.right);
      case '/':
        return this.visit(node.left) / this.visit(node.right);
      case '^':
        return this.visit(node.left) ** this.visit(node.right);
      default:
        throw new Error(`Invalid operation: ${node.operator}`);
    }
  }

  visitUnaryExpression(node) {
    return -this.visit(node.value);
  }

  visitFunction(node) {
    switch (node.name) {
      case 'sin':
        return Math.sin(this.visit(node.value));
      case 'cos':
        return Math.cos(this.visit(node.value));
      case 'tan':
        return Math.tan(this.visit(node.value));
      default:
        throw new Error(`Invalid function: ${node.name}`);
    }
  }

  visitNumber(node) {
    return node.value;
  }
}

module.exports = { NodeVisitor };
