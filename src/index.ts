import { createErrorTackle } from './error'
import { createReporter } from './report'
import { TackleOptions } from './typings/types'

export const enum ERROR_TYPE {
  JS_ERROR = 'jsError',
  PROMISE_ERROR = 'promiseError',
  RESOURCE_ERROR = 'resourceError',
  CONSOLE_ERROR = 'consoleError',
}

export const defaultOptions: TackleOptions = {
  method: 'IMG',
  logError: true,
  jsError: true,
  promiseError: true,
  resourceError: true,
  consoleError: true,
  vueError: false,
  vueApp: null,
  coverError: true,
  extendsData: null,
}

const getOptions = <T extends Object>(options: T): TackleOptions => {
  if (!options) return { ...defaultOptions }
  const opts = {} as TackleOptions
  const keys = Object.keys(defaultOptions) as (keyof TackleOptions)[]
  keys.forEach((key) => {
    opts[key] = (options as TackleOptions)[key] ?? defaultOptions[key]
  })

  return opts
}

export const createTackle = (options: TackleOptions) => {
  const _options = getOptions(options)
  const reporter = createReporter(_options)
  createErrorTackle(_options, reporter)
}
