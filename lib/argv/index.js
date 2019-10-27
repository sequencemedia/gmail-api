const argsMap = require('./args-map')

const hasCredentialsPath = (map = argsMap) => map.has('credentialsPath')

const getCredentialsPath = (map = argsMap) => map.get('credentialsPath')

const hasCredentialsTokenPath = (map = argsMap) => map.has('credentialsTokenPath')

const getCredentialsTokenPath = (map = argsMap) => map.get('credentialsTokenPath')

const hasCredentialsJson = (map = argsMap) => map.has('credentialsJson')

const getCredentialsJson = (map = argsMap) => map.get('credentialsJson')

const hasCredentialsTokenJson = (map = argsMap) => map.has('credentialsTokenJson')

const getCredentialsTokenJson = (map = argsMap) => map.get('credentialsTokenJson')

module.exports = {
  hasCredentialsPath,
  getCredentialsPath,
  hasCredentialsTokenPath,
  getCredentialsTokenPath,
  hasCredentialsJson,
  getCredentialsJson,
  hasCredentialsTokenJson,
  getCredentialsTokenJson
}
