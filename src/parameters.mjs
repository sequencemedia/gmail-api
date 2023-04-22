import {
  hasCredentialsPath as hasCredentialsPathArgValue,
  getCredentialsPath as getCredentialsPathArgValue,
  hasCredentialsTokenPath as hasCredentialsTokenPathArgValue,
  getCredentialsTokenPath as getCredentialsTokenPathArgValue,
  hasCredentialsJson as hasCredentialsJsonArgValue,
  getCredentialsJson as getCredentialsJsonArgValue,
  hasCredentialsTokenJson as hasCredentialsTokenJsonArgValue,
  getCredentialsTokenJson as getCredentialsTokenJsonArgValue
} from '#argv'

/**
 * Default Path
 */
export const CREDENTIALS_PATH = 'credentials.json'
export const CREDENTIALS_TOKEN_PATH = 'credentials-token.json'

export const hasCredentialsPathEnvValue = ({ env = {} } = process) => Reflect.has(env, 'CREDENTIALS_PATH')

export const hasCredentialsTokenPathEnvValue = ({ env = {} } = process) => Reflect.has(env, 'CREDENTIALS_TOKEN_PATH')

export const getCredentialsPathEnvValue = ({ env = {} } = process) => Reflect.get(env, 'CREDENTIALS_PATH')

export const getCredentialsTokenPathEnvValue = ({ env = {} } = process) => Reflect.get(env, 'CREDENTIALS_TOKEN_PATH')

export const hasCredentialsJsonEnvValue = ({ env = {} } = process) => Reflect.has(env, 'CREDENTIALS_JSON')

export const hasCredentialsTokenJsonEnvValue = ({ env = {} } = process) => Reflect.has(env, 'CREDENTIALS_TOKEN_JSON')

export const getCredentialsJsonEnvValue = ({ env = {} } = process) => Reflect.get(env, 'CREDENTIALS_JSON')

export const getCredentialsTokenJsonEnvValue = ({ env = {} } = process) => Reflect.get(env, 'CREDENTIALS_TOKEN_JSON')

/**
 * Path
 */
export const getCredentialsPath = () => hasCredentialsPathArgValue() ? getCredentialsPathArgValue() : hasCredentialsPathEnvValue() ? getCredentialsPathEnvValue() : CREDENTIALS_PATH

export const getCredentialsTokenPath = () => hasCredentialsTokenPathArgValue() ? getCredentialsTokenPathArgValue() : hasCredentialsTokenPathEnvValue() ? getCredentialsTokenPathEnvValue() : CREDENTIALS_TOKEN_PATH

/**
 * Json
 */
export const hasCredentialsJson = () => hasCredentialsJsonArgValue() || hasCredentialsJsonEnvValue()

export const getCredentialsJson = () => hasCredentialsJsonArgValue() ? getCredentialsJsonArgValue() : getCredentialsJsonEnvValue()

export const hasCredentialsTokenJson = () => hasCredentialsTokenJsonArgValue() || hasCredentialsTokenJsonEnvValue()

export const getCredentialsTokenJson = () => hasCredentialsTokenJsonArgValue() ? getCredentialsTokenJsonArgValue() : getCredentialsTokenJsonEnvValue()
