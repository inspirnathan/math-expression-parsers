const { Parser } = require('./Parser');

const input = process.argv[2]
const parser = new Parser()
console.log(parser.parse(input))
