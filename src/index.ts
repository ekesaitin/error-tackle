import { ErrorOptions, createErrorTackle } from './error'
import { ErrorInfo } from './error/parseErrorInfo'
import { createReporter } from './report'

export const enum ERROR_TYPE {
  JS_ERROR,
  PROMISE_ERROR,
  AJAX_ERROR,
  RESOURCE_ERROR,
  CONSOLE_ERROR,
  VUE_ERROR,
}

export interface Options {
  /** 上报信息的接口地址 */
  url?: string
  /** 上报信息的请求方式 */
  method?: 'GET' | 'POST' | 'IMG'
  /** 是否在控制台打印错误 */
  logInfo?: boolean
  /** 上报信息需要额外携带的数据 */
  extendsData?: any
  /** 捕获到错误时会执行的方法 */
  onError?: (info: ErrorInfo) => void
}

export type TackleOptions = Options & ErrorOptions

export const defaultOptions: Options = {
  method: 'IMG',
  logInfo: true,
}

const defaultErrorOptions: ErrorOptions = {
  jsError: true,
  promiseError: true,
  ajaxError: true,
  resourceError: true,
  consoleError: true,
  vueError: false,
  vueApp: null,
  coverError: true,
  extendsData: null,
}

const getOptions = <T extends Object, P extends T>(options: T, defaultOpts: P): P => {
  if (!options) return { ...defaultOpts }
  const opts = {} as P
  const keys = Object.keys(defaultOpts) as (keyof P)[]
  keys.forEach((key) => {
    opts[key] = (options as P)[key] ?? defaultOpts[key]
  })

  return opts
}

export const createTackle = (options: TackleOptions) => {
  const reporter = createReporter(options)
  const errorOptions = getOptions(options, defaultErrorOptions)
  createErrorTackle(errorOptions, reporter)
}
