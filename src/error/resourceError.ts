import { ERROR_TYPE } from 'src'
import { Reporter } from 'src/report'
import { ErrorOptions } from '.'
import { getErrorInfo } from './parseErrorInfo'

export const tackleResourceError = (options: ErrorOptions, reporter: Reporter) =>
  window.addEventListener(
    'error',
    (e) => {
      let target = e.target
      var isElementTarget =
        target instanceof HTMLScriptElement ||
        target instanceof HTMLLinkElement ||
        target instanceof HTMLImageElement

      if (!isElementTarget) return

      const { coverError } = options
      coverError && e.preventDefault()
      let errorInfo = getErrorInfo(ERROR_TYPE.RESOURCE_ERROR, e)
      reporter(errorInfo)
    },
    { capture: true },
  )
