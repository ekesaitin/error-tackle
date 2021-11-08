import { ERROR_TYPE } from '..'
import { Reporter, TackleOptions } from 'src/typings/types'
import { getErrorInfo } from 'src/error/parseErrorInfo'

export const tackleResourceError = (options: TackleOptions, reporter: Reporter) =>
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
