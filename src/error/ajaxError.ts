import { AnyObject } from 'src/typings/types'
import { ERROR_TYPE } from 'src'
import { AJAX_ERROR_TYPE, getErrorInfo } from 'src/error/parseErrorInfo'
import { TackleOptions, Reporter } from 'src/typings/types'
import { isObject, noop } from 'src/utils'

interface StackMap {
  stack: object
}

const shallowCloneError = <T extends object>(err: T): T => {
  if (!isObject(err)) {
    return err
  }
  const res = Object.create(null)
  for (let key in err) {
    res[key] = err[key]
  }
  return res
}

const handleReportError = (
  reporter: Reporter,
  type: AJAX_ERROR_TYPE,
  error: any,
  stackMap?: StackMap,
) => {
  const err = shallowCloneError(error)
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
  let _handleEvent = (e: any) => {
    try {
      if (e && e.currentTarget && e.currentTarget.status !== 200) {
        handleReportError(reporter, AJAX_ERROR_TYPE.XHR_ERROR, e, interceptiveStack)
      }
    } catch (err) {
      handleReportError(reporter, AJAX_ERROR_TYPE.XHR_ERROR, err, interceptiveStack)
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

const rewriteFetch = (reporter: Reporter) => {
  if (!window.fetch) return

  let _oldFetch = window.fetch
  function newFetch(input: RequestInfo, init?: RequestInit | undefined) {
    const interceptiveStack = {} as StackMap
    Error.captureStackTrace(interceptiveStack, newFetch)

    return (
      _oldFetch
        // @ts-ignore
        .call(this, input, init)
        .then((res) => {
          if (!res.ok) {
            // setStack(res, interceptiveStack)
            handleReportError(reporter, AJAX_ERROR_TYPE.FETCH_ERROR, res, interceptiveStack)
          }
          return res
        })
        .catch(function fn(err) {
          // setStack(err, interceptiveStack)
          handleReportError(reporter, AJAX_ERROR_TYPE.FETCH_ERROR, err, interceptiveStack)
        })
    )
  }

  window.fetch = newFetch as typeof window.fetch
}

export const tackleAjaxError = (options: TackleOptions, reporter: Reporter) => {
  rewriteXmlHttpRequest(reporter)
  rewriteFetch(reporter)
}
