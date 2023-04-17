%lex

%%

\s+                             /* skip whitespace */
^(?:\d+(?:\.\d*)?|\.\d+)        return 'NUMBER'
\w+                             return 'ID'

/lex

%{
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
%}

%left '+' '-'
%left '*' '/'
%right '^'

%%

e
  : e '+' e    { $$ = BinaryExpression($2, $1, $3) }
  | e '-' e    { $$ = BinaryExpression($2, $1, $3) }
  | e '*' e    { $$ = BinaryExpression($2, $1, $3) }
  | e '/' e    { $$ = BinaryExpression($2, $1, $3) }
  | e '^' e    { $$ = BinaryExpression($2, $1, $3) }
  | '(' e ')'  { $$ = $2 }
  | ID '(' e ')'  { $$ = FunctionExpression($1, $3) }
  | '-' e      { $$ = UnaryExpression($2) }
  | NUMBER     { $$ = NumericLiteral($1) }
  ;
