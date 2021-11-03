import { ERROR_TYPE, TackleOptions } from 'src'
import { Reporter } from 'src/report'
import { getErrorInfo } from './parseErrorInfo'

export const tackleJsError = (options: TackleOptions, reporter: Reporter) =>
  window.addEventListener('error', (e) => {
    const { coverError } = options
    coverError && e.preventDefault()
    let errorInfo = getErrorInfo(ERROR_TYPE.JS_ERROR, e)
    reporter(errorInfo)
  })
