const yargsParser = require('yargs-parser')

module.exports = new Map(Object.entries(yargsParser(process.argv.slice(2))))
