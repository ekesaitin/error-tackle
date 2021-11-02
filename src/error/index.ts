import { Reporter } from 'src/report'
import { tackleJsError } from './jsError'

export interface ErrorOptions {
  jsError?: boolean
  promiseError?: boolean
  ajaxError?: boolean
  resourceError?: boolean
  consoleError?: boolean
  vueError?: boolean
  vueApp?: {
    config: {
      errorHandler?: (err: unknown, instance: AnyObject | null, info: string) => void
    } & AnyObject
  } & AnyObject
  logInfo?: boolean
  coverError?: boolean
  extendsData: any
}

export const createErrorTackle = (options: ErrorOptions, reporter: Reporter) => {
  const { jsError, promiseError, resourceError, vueApp, vueError } = options
  if (jsError) tackleJsError(options, reporter)
}
