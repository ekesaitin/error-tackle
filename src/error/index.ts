import { tackleConsoleError } from 'src/error/consoleError'
import { AnyObject, Reporter, TackleOptions } from 'src/typings/types'
import { isVueApp } from 'src/utils'
import { tackleJsError } from './jsError'
import { tacklePromiseError } from './promiseError'
import { tackleResourceError } from './resourceError'
import { tackleVueError } from './vueError'

/**
 * 原生的addEventListener方法在下面三种情况下无法捕获到错误，需要重写
 * 1.调用远端JS的方法出错
 * 2.远端JS内部的事件出问题
 * 3.在setTimeout等回调内出错
 */
const rewriteEventListener = () => {
  const originAddEventListener = EventTarget.prototype.addEventListener
  EventTarget.prototype.addEventListener = function (type, listener, options) {
    const wrappedListener = function (...args: any[]) {
      try {
        // @ts-ignore
        return listener?.apply(this, args)
      } catch (err) {
        throw err
      }
    }
    return originAddEventListener.call(this, type, wrappedListener, options)
  }
}

export const createErrorTackle = (options: TackleOptions, reporter: Reporter) => {
  rewriteEventListener()

  const { jsError, promiseError, resourceError, vueApp, vueError, consoleError } = options

  if (jsError) tackleJsError(options, reporter)
  if (promiseError) tacklePromiseError(options, reporter)
  if (resourceError) tackleResourceError(options, reporter)
  if (vueError && isVueApp(vueApp)) tackleVueError(options, reporter)
  if (consoleError) tackleConsoleError(options, reporter)
}
