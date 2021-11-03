import { TackleOptions } from 'src'
import { Reporter } from 'src/report'
import { getDateTime, isEventListenerObject, isVueApp } from 'src/utils'
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

let wrapedListener = false
const wrapListener = () => {
  const originAddEventListener = EventTarget.prototype.addEventListener
  EventTarget.prototype.addEventListener = function (type, listener, options) {
    const wrappedListener = function (...args: any[]) {
      try {
        // @ts-ignore
        return listener.apply(this, args)
      } catch (err) {
        throw err
      }
    }
    return originAddEventListener.call(this, type, wrappedListener, options)
  }
}

export const createErrorTackle = (options: TackleOptions, reporter: Reporter) => {
  if (!wrapedListener) {
    wrapedListener = true
    wrapListener()
  }
  const { jsError, promiseError, resourceError, vueApp, vueError } = options
  if (jsError) tackleJsError(options, reporter)
  if (promiseError) tacklePromiseError(options, reporter)
  if (resourceError) tackleResourceError(options, reporter)
  if (vueError && isVueApp(vueApp)) tackleVueError(options, reporter)
}
