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
export interface ErrorOptions {
  /** 是否监听js错误（TypeError、ReferenceError等） */
  jsError?: boolean
  /** 是否监听promise错误 */
  promiseError?: boolean
  /** 是否监听ajax错误 */
  ajaxError?: boolean
  /** 是否监听资源错误 */
  resourceError?: boolean
  /** 是否监听错误 */
  consoleError?: boolean
  /** 是否监听vue错误 */
  vueError?: boolean
  /** vue应用实例 */
  vueApp?: VueApp | null
  /** 是否阻止错误继续向上传播 */
  coverError?: boolean
  /** 上报信息需要额外携带的数据 */
  extendsData: any
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

export const createErrorTackle = (options: ErrorOptions, reporter: Reporter) => {
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
