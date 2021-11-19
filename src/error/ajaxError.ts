import { getErrorInfo } from 'src/error/parseErrorInfo'
import {
  AJAX_ERROR_TYPE,
  ERROR_TYPE,
  FETCH_URL_END,
  Reporter,
  StackMap,
  TackleOptions,
} from 'src/typings/types'
import { isString, noop } from 'src/utils'

const getCloneError = <T extends Error>(error: T): T => {
  if (error instanceof Error) {
    const { name } = error
    const newError = new (window as any)[name](error.message)
    Error.captureStackTrace(newError, getCloneError)
    return newError
  } else {
    return error
  }
}

const handleReportError = (
  reporter: Reporter,
  type: AJAX_ERROR_TYPE,
  error: any,
  stackMap?: StackMap,
) => {
  const err = getCloneError(error)

  if (stackMap) {
    err.stack = stackMap.stack
  }
  const info = getErrorInfo(ERROR_TYPE.AJAX_ERROR, err, type)
  reporter(info)
}

const rewriteXmlHttpRequest = (reporter: Reporter) => {
  if (!window.XMLHttpRequest) {
    return
  }
  const interceptiveStack = {} as StackMap

  let xhrSend = XMLHttpRequest.prototype.send
  let fetched = false
  let _handleEvent = (e: any) => {
    try {
      if (e && e.currentTarget && e.currentTarget.status !== 200) {
        if (!fetched) {
          fetched = true
          handleReportError(reporter, AJAX_ERROR_TYPE.XHR_ERROR, e, interceptiveStack)
        }
      }
    } catch (err) {
      if (!fetched) {
        fetched = true
        handleReportError(reporter, AJAX_ERROR_TYPE.XHR_ERROR, err, interceptiveStack)
      }
    } finally {
      fetched = false
    }
  }
  XMLHttpRequest.prototype.send = function newSend() {
    Error.captureStackTrace(interceptiveStack, newSend)
    if (this.addEventListener) {
      this.addEventListener('error', _handleEvent)
      this.addEventListener('load', _handleEvent)
      this.addEventListener('abort', _handleEvent)
    } else {
      let tempStateChange = this.onreadystatechange ?? noop
      this.onreadystatechange = function (event) {
        // @ts-ignore
        tempStateChange.apply(this, arguments)
        if (this.readyState === 4) {
          _handleEvent(event)
        }
      }
    }
    // @ts-ignore
    return xhrSend.apply(this, arguments)
  }
}

/**
 * 表示当前fetch已经捕获的错误
 * 防止unhandledrejection重复捕获相同错误
 */
export let inCaptureError: any

const rewriteFetch = (reporter: Reporter) => {
  if (!window.fetch) return

  let _oldFetch = window.fetch
  function newFetch(input: RequestInfo, init?: RequestInit | undefined) {
    const interceptiveStack = {} as StackMap
    Error.captureStackTrace(interceptiveStack, newFetch)
    let fetched = false

    /**
     * 标识是否是由reporter发出的请求
     * 如果是，则不进行错误捕获
     */
    let isReportFetch = false
    if (isString(input)) {
      if (input.endsWith(FETCH_URL_END)) {
        isReportFetch = true
        input = input.replace(FETCH_URL_END, '')
      }
    }

    return (
      _oldFetch
        // @ts-ignore
        .call(this, input, init)
        .then((res) => {
          if (isReportFetch) {
            return res
          }
          if (!res.ok) {
            if (!fetched) {
              fetched = true
              handleReportError(reporter, AJAX_ERROR_TYPE.FETCH_ERROR, res, interceptiveStack)
            }
          }
          return res
        })
        .catch(function fn(err) {
          if (isReportFetch) return
          if (!fetched) {
            fetched = true
            handleReportError(reporter, AJAX_ERROR_TYPE.FETCH_ERROR, err, interceptiveStack)
          }
          const error = getCloneError(err)
          error.stack = interceptiveStack.stack
          inCaptureError = error
          throw error
        })
    )
  }

  window.fetch = newFetch as typeof window.fetch
}

export const tackleAjaxError = (options: TackleOptions, reporter: Reporter) => {
  rewriteXmlHttpRequest(reporter)
  rewriteFetch(reporter)
}
