{{
  function operatorReducer (result, element) {
    const left = result;
    const right = element[3];
    const op = element[1];

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
  }

  function trig(id, value) {
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
  = head:Group tail:(_ "^" _ Factor)* {
      return tail.reduce(operatorReducer, head);
    }

Group
  = _ @Primary _

ID
  = [a-z]+ { return text(); }

Decimal
  = [0-9]* ("." [0-9]*)?

Primary
  = "(" _ @Expression _ ")"
  / "-" expr:Factor { return -expr; }
  / id:ID "(" _ expr:Expression _ ")" { return trig(id, expr); }
  / Decimal { return parseFloat(text(), 10); }

_ "whitespace"
  = [ \t\n\r]*
