import { createErrorTackle, ErrorOptions } from './error'
import { createReporter } from './report'
import { ErrorInfo, pick } from './utils'

export interface Options {
  url?: string
  method?: 'GET' | 'POST' | 'IMG'
  onError?: (info: ErrorInfo) => void
}

export type TackleOptions = Options & ErrorOptions

const defaultErrorOptions: ErrorOptions = {
  jsError: true,
  promiseError: true,
  ajaxError: true,
  resourceError: true,
  consoleError: true,
  vueError: false,
  logInfo: true,
  coverError: true,
  extendsData: null,
}

const getOptions = <T, P extends T>(options: T, defaultOpts: P) => {
  const keys = Object.keys(defaultOpts) as any as (keyof T)[]
  options = options ?? ({} as T)
  const opts = pick(options, keys)

  return { ...defaultErrorOptions, ...opts }
}

export const createTackle = (options: TackleOptions) => {
  const reporter = createReporter(options)
  createErrorTackle(getOptions(options, defaultErrorOptions), reporter)
}
