import { tackleAjaxError } from 'src/error/ajaxError'
import { tackleConsoleError } from 'src/error/consoleError'
import { Reporter, TackleOptions } from 'src/typings/types'
import { isVueApp } from 'src/utils'
import { tackleJsError } from './jsError'
import { tacklePromiseError } from './promiseError'
import { tackleResourceError } from './resourceError'
import { tackleVueError } from './vueError'

export const createErrorTackle = (options: TackleOptions, reporter: Reporter) => {
  const { jsError, promiseError, resourceError, consoleError, ajaxError, vueApp, vueError } =
    options

  if (jsError) tackleJsError(options, reporter)
  if (promiseError) tacklePromiseError(options, reporter)
  if (resourceError) tackleResourceError(options, reporter)
  if (consoleError) tackleConsoleError(options, reporter)
  if (vueError && isVueApp(vueApp)) tackleVueError(options, reporter)
  if (ajaxError) tackleAjaxError(options, reporter)
}
