import yargsParser from 'yargs-parser'

export default new Map(Object.entries(yargsParser(process.argv.slice(2))))
