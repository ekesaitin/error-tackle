import { ERROR_TYPE } from 'src'
import { getDateTime } from 'src/utils'
import { getUserAgent, UserAgentObj } from 'src/utils/client'

interface VueErrorEvent {
  err: any
  vm: AnyObject
  info: string
}

export interface ErrorInfo {
  type: string
  error: any
  message: string
  datatime?: string
  extendsData?: any
  userAgent?: UserAgentObj
}

const getErrorType = (e: ErrorEvent | PromiseRejectionEvent) => {
  if (e instanceof ErrorEvent) return e.error?.name
  else if (e instanceof PromiseRejectionEvent) return e.type
}

const getJsError = (e: ErrorEvent): ErrorInfo => ({
  type: getErrorType(e),
  error: e.error,
  message: e.error?.message,
})

const getPromiseError = (e: PromiseRejectionEvent): ErrorInfo => ({
  type: getErrorType(e),
  error: e.reason,
  message: e.reason?.message,
})

const getResourceError = (e: ErrorEvent): ErrorInfo => {
  const target = e.target as any
  let error = `${target.tagName.toLowerCase()}: ${target?.src ?? target?.href} 加载错误，页面URL: ${
    target.baseURI
  }`

  return {
    type: 'ResourceError',
    error,
    message: '资源加载错误',
  }
}

const getVueError = (e: VueErrorEvent): ErrorInfo => ({
  type: e.err?.name,
  error: e.err,
  message: e.info,
})

export const getErrorInfo = (
  errorType: ERROR_TYPE,
  e: ErrorEvent | PromiseRejectionEvent | VueErrorEvent,
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
    case ERROR_TYPE.VUE_ERROR:
      info = getVueError(e as VueErrorEvent)
      break
  }

  info.datatime = getDateTime()
  info.userAgent = getUserAgent()

  return info
}
