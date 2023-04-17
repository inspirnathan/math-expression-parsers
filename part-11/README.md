# Part 11
Code for [Part 11](https://inspirnathan.com/posts/159-how-to-build-lr-parser-for-math-expressions/) of my math expression parser series at [inspirnathan.com](https://inspirnathan.com)

## Commands
* `npm install`: Install the necessary dependencies to run the syntax-cli parser generator tool.

* `npm run parse`: Parse the `calc.g` grammar using LALR1 mode.

* `npm run generate`: Generate a parser named `calc-parser.js` from the `calc.g` grammar using LALR1 mode.

* `npm run parse-ast`: Parse the `calc-ast.g` grammar using LALR1 mode.

* `npm run generate-ast`: Generate a parser named `calc-ast-parser.js` from the `calc-ast.g` grammar using LALR1 mode.

* `node calc-example`: Run example code for evaluating a math expression using a generated parser from the `calc.g` grammar file.

* `node calc-ast-example`: Run example code for displaying an abstract syntax tree (AST) from a math expression using a generated parser from the `calc-ast.g` grammar file.