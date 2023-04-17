%lex

%%

\s+                             /* skip whitespace */
^(?:\d+(?:\.\d*)?|\.\d+)        return 'NUMBER'
\w+                             return 'ID'

/lex

%{
  function trig(id, value) {
    switch (id) {
      case 'sin':
        return Math.sin(value);
      case 'cos':
        return Math.cos(value);
      case 'tan':
        return Math.tan(value);
    }
  }
%}

%left '+' '-'
%left '*' '/'
%right '^'

%%

e
  : e '+' e    { $$ = $1 + $3 }
  | e '-' e    { $$ = $1 - $3 }
  | e '*' e    { $$ = $1 * $3 }
  | e '/' e    { $$ = $1 / $3 }
  | e '^' e    { $$ = $1 ** $3 }
  | '(' e ')'  { $$ = $2 }
  | ID '(' e ')'  { $$ = trig($1, $3) }
  | '-' e      { $$ = -$2 }
  | NUMBER     { $$ = Number($1) }
  ;
