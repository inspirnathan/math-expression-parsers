# Part 18
Code for [Part 18](https://inspirnathan.com/posts/166-small-programming-language-with-pratt-parser-using-javascript/) of my math expression parser series at [inspirnathan.com](https://inspirnathan.com)

## Commands
* `node tests`: Run a Pratt parser, that evaluates statements, for a custom programming language called Tiny Math Language (TML) against multiple test inputs.

* `./tml-runner example.tml`: Execute the TML program, `example.tml` using the `tml-runner` interpreter.

* `./tml-runner example.tml | node display.js`: Execute the TML program, pipe the output of `example.tml` into the input of `display.js`, and execute `display.js`.