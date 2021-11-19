import { inCaptureError } from 'src/error/ajaxError'
import { ERROR_TYPE, Reporter, TackleOptions } from 'src/typings/types'
import { getErrorInfo } from './parseErrorInfo'

export const tacklePromiseError = (options: TackleOptions, reporter: Reporter) =>
  window.addEventListener('unhandledrejection', function (e) {
    const { coverError } = options
    coverError && e.preventDefault()
    if (Object.is(e.reason, inCaptureError)) {
      return
    }
    let errorInfo = getErrorInfo(ERROR_TYPE.PROMISE_ERROR, e)
    reporter(errorInfo)
  })
