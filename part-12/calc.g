%lex

%%

\s+             /* skip whitespace */
\d+             return 'NUMBER'
\w+             return 'ID'

/lex

%%

expression
  : term expression'
  ;

expression'
  : "+" term expression'
  | "-" term expression'
  | /* epsilon */
  ;

term
  : factor term'
  ;

term'
  : "*" factor term'
  | "/" factor term'
  | /* epsilon */
  ;

factor
  : power factor'
  ;

factor'
  : "^" power factor'
  | /* epsilon */
  ;

power
  : primary
  ;

primary
  : NUMBER
  | "-" power
  | "(" expression ")"
  | ID "(" expression ")"
  ;
