%lex

%%

\s+             /* skip whitespace */

/lex

%%

E
  : E 'pizza'
  | E 'donut'
  | 'pizza'
  | 'donut'
  ;
