import { ERROR_TYPE, TackleOptions } from 'src'
import { Reporter } from 'src/report'
import { getErrorInfo } from './parseErrorInfo'

export const tacklePromiseError = (options: TackleOptions, reporter: Reporter) =>
  window.addEventListener('unhandledrejection', function (e) {
    const { coverError } = options
    coverError && e.preventDefault()
    let errorInfo = getErrorInfo(ERROR_TYPE.PROMISE_ERROR, e)
    reporter(errorInfo)
  })
