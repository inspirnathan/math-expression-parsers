/**
 * This is a comment.
 */

{
  lex: {
    rules: [
      ["\\s+",        "/* skip whitespace */"],
      ["\\d+",        "return 'NUMBER'"],
    ],
  },

  bnf: {
    E: [
      ["E 'pizza'",   "$$ = $1 + ' ' + $2 + ' 🍕'"],
      ["E 'donut'",   "$$ = $1 + ' ' + $2 + ' 🍩'"],
      ["'pizza'",   "$$ = $1 + ' 🍕'"],
      ["'donut'",   "$$ = $1 + ' 🍩'"],
      ["NUMBER",   "$$ = Number($1)"]
    ],
  }
}
