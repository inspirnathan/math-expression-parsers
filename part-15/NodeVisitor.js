class NodeVisitor {
  visit(node) {
    switch (node.type) {
      case 'Number':
        return this.visitNumber(node);
      case 'BinaryExpression':
        return this.visitBinaryExpression(node);
      case 'UnaryExpression':
        return this.visitUnaryExpression(node);
      case 'Function':
        return this.visitFunction(node);
    }
  }

  visitNumber(node) {
    return node.value;
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
}

module.exports = { NodeVisitor }
