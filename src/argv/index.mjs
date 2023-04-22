import argsMap from './args-map.mjs'

export const hasCredentialsPath = (map = argsMap) => map.has('credentialsPath')

export const getCredentialsPath = (map = argsMap) => map.get('credentialsPath')

export const hasCredentialsTokenPath = (map = argsMap) => map.has('credentialsTokenPath')

export const getCredentialsTokenPath = (map = argsMap) => map.get('credentialsTokenPath')

export const hasCredentialsJson = (map = argsMap) => map.has('credentialsJson')

export const getCredentialsJson = (map = argsMap) => map.get('credentialsJson')

export const hasCredentialsTokenJson = (map = argsMap) => map.has('credentialsTokenJson')

export const getCredentialsTokenJson = (map = argsMap) => map.get('credentialsTokenJson')
