import { TackleOptions } from 'src'
import { Reporter } from 'src/report'
import { isVueApp } from 'src/utils'
import { tackleJsError } from './jsError'
import { tacklePromiseError } from './promiseError'
import { tackleResourceError } from './resourceError'
import { tackleVueError } from './vueError'

export type VueErrorHandler = (err: any, vm: AnyObject, info: string) => void
export interface VueApp {
  config: {
    errorHandler: VueErrorHandler
  }
}

export const createErrorTackle = (options: TackleOptions, reporter: Reporter) => {
  const { jsError, promiseError, resourceError, vueApp, vueError } = options
  if (jsError) tackleJsError(options, reporter)
  if (promiseError) tacklePromiseError(options, reporter)
  if (resourceError) tackleResourceError(options, reporter)
  if (vueError && isVueApp(vueApp)) tackleVueError(options, reporter)
}
