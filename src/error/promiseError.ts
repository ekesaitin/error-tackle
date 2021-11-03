import { ERROR_TYPE } from 'src'
import { Reporter } from 'src/report'
import { ErrorOptions } from '.'
import { getErrorInfo } from './parseErrorInfo'

export const tacklePromiseError = (options: ErrorOptions, reporter: Reporter) =>
  window.addEventListener('unhandledrejection', function (e) {
    const { coverError } = options
    coverError && e.preventDefault()
    let errorInfo = getErrorInfo(ERROR_TYPE.PROMISE_ERROR, e)
    reporter(errorInfo)
  })
