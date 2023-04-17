{{
  const functionList = ['sin', 'cos', 'tan'];

  function FunctionExpression(id, value) {
    if (functionList.includes(id)) {
      return {
        type: 'Function',
        name: id,
        value
      }
    }
  }

  function BinaryExpression(operator, left, right) {
    return {
      type: 'BinaryExpression',
      operator,
      left,
      right
    }
  }

  function UnaryExpression(value) {
    return {
      type: 'UnaryExpression',
      value
    }
  }

  function NumericLiteral(value) {
    return {
      type: 'Number',
      value: Number(value)
    }
  }

  function operatorReducer (result, element) {
    const left = result;
    const right = element[3];
    const op = element[1];

    return BinaryExpression(op, left, right);
  }
}}

Expression
  = head:Term tail:(_ ("+" / "-") _ Term)* {
      return tail.reduce(operatorReducer, head);
    }

Term
  = head:Factor tail:(_ ("*" / "/") _ Factor)* {
      return tail.reduce(operatorReducer, head);
    }

Factor
  = head:Group tail:(_ ("^") _ Factor)* {
      return tail.reduce(operatorReducer, head);
    }

Group
  = _ @Primary _

Primary
  = ParenthesizedExpression
  / UnaryExpression
  / Function
  / Decimal

Decimal
  = _ [0-9]* ('.' [0-9]*)? _ { return NumericLiteral(text()) }

UnaryExpression
  = '-' expr:Factor { return UnaryExpression(expr) }

ParenthesizedExpression
  = '(' _ @Expression _ ')'

ID
  = [a-z]+ { return text(); }

Function
  = id:ID expr:ParenthesizedExpression { return FunctionExpression(id, expr) }

_ 'whitespace'
  = [ \t\n\r]*
