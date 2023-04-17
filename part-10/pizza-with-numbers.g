%lex

%%

\s+             /* skip whitespace */
\d+             return 'NUMBER'

/lex

%%

E
  : E 'pizza'
  | E 'donut'
  | 'pizza'
  | 'donut'
  | NUMBER
  ;
