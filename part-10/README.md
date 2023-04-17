# Part 10
Code for [Part 10](https://inspirnathan.com/posts/158-how-to-use-syntax-cli-parser-generator/) of my math expression parser series at [inspirnathan.com](https://inspirnathan.com)

## Commands
* `npm install`: Install the necessary dependencies to run the syntax-cli parser generator tool.
* 
* `npm run parse`: Parse the `pizza.g` grammar using LALR1 mode.

* `npm run parse-ignore-whitespace`: Parse the `pizza.g` grammar using LALR1 mode and ignore whitespaces in the input.

* `npm run generate`: Generate a file called `parser.js` using the `pizza-semantic-actions.g` grammar with LALR1 mode.

* `npm run tokenize`: Show the output of the parse for an input that uses the `pizza-semantic-actions.g` grammar file and display the tokens used.

* `npm run tokenize-only`: Display only the tokens used when parsing an input that uses the `pizza-semantic-actions.g` grammar file.

* `npm run collections`: Show collections when parsing input that uses the `pizza-semantic-actions.g` grammar file.

* `npm run table`: Show parsing tables when parsing input that uses the `pizza-semantic-actions.g` grammar file.

* `npm run debug`: Show debug information when parsing input that uses the `pizza-semantic-actions.g` grammar file.

* `npm run help`: Display all the different options and flags available for the [syntax-cli](https://github.com/DmitrySoshnikov/syntax) tool.

* `node example`: Run example code for using a generated "pizza-donut" parser built by the [syntax-cli](https://github.com/DmitrySoshnikov/syntax) tool.