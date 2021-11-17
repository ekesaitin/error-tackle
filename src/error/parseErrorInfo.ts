import { AJAX_ERROR_TYPE, ErrorInfo, ERROR_TYPE, VueErrorEvent } from 'src/typings/types'
import { getDateTime, getSourceFromStack } from 'src/utils'
import { getUserAgent } from 'src/utils/client'

const getErrInfoWithSource = (target: ErrorInfo, stack: string): ErrorInfo => {
  const source = getSourceFromStack(stack)
  if (source) {
    return {
      ...target,
      ...source,
    }
  } else {
    return target
  }
}

const getErrorType = (e: ErrorEvent | PromiseRejectionEvent) => {
  if (e instanceof ErrorEvent) return e.error?.name
  else if (e instanceof PromiseRejectionEvent) return e.type
}

const getJsError = (e: ErrorEvent): ErrorInfo => {
  return getErrInfoWithSource(
    {
      type: getErrorType(e),
      error: e.error,
      message: e.error?.message,
    },
    e.error.stack,
  )
}

const getPromiseError = (e: PromiseRejectionEvent): ErrorInfo => ({
  type: getErrorType(e),
  error: e.reason,
  message: e.reason?.message,
})

const getResourceError = (e: ErrorEvent): ErrorInfo => {
  const target = e.target as any
  let error = ` ${target.baseURI}页面 加载${target.tagName.toLowerCase()}: ${
    target?.src ?? target?.href
  } 错误`

  return {
    type: 'ResourceError',
    error,
    message: '资源加载错误',
  }
}

const getConsoleError = (e: any): ErrorInfo => {
  const info = {
    type: 'ConsoleError',
    error: e,
    message: `${window.location.href}，页面通过 console.error 抛出的错误，`,
  }

  if (e instanceof Error) {
    return getErrInfoWithSource(info, e.stack ?? '')
  } else {
    return info
  }
}

const getAjaxError = (e: any, type: AJAX_ERROR_TYPE): ErrorInfo => {
  return getErrInfoWithSource(
    {
      type,
      error: e,
      message: 'ajax error',
    },
    e.stack,
  )
}

export const getErrorInfo = (
  errorType: ERROR_TYPE | never,
  e: ErrorEvent | PromiseRejectionEvent | VueErrorEvent,
  ...args: any[]
): ErrorInfo => {
  let info = {} as ErrorInfo
  switch (errorType) {
    case ERROR_TYPE.JS_ERROR:
      info = getJsError(e as ErrorEvent)
      break
    case ERROR_TYPE.PROMISE_ERROR:
      info = getPromiseError(e as PromiseRejectionEvent)
      break
    case ERROR_TYPE.RESOURCE_ERROR:
      info = getResourceError(e as ErrorEvent)
      break
    case ERROR_TYPE.CONSOLE_ERROR:
      info = getConsoleError(e)
      break
    case ERROR_TYPE.AJAX_ERROR:
      info = getAjaxError(e, args[0])
      break
  }

  info.datatime = getDateTime()
  info.userAgent = getUserAgent()

  return info
}
