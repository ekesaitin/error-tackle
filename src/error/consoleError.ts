import { ERROR_TYPE } from 'src'
import { getErrorInfo } from 'src/error/parseErrorInfo'
import { TackleOptions, Reporter } from 'src/typings/types'

const noop = () => {}
export const tackleConsoleError = (options: TackleOptions, reporter: Reporter) => {
  const consoleError = window.console?.error || noop
  const { coverError } = options
  window.console.error = function (...args: any[]) {
    args.forEach((err) => {
      setTimeout(() => {
        if (err instanceof Error) throw err
        else {
          let info = getErrorInfo(ERROR_TYPE.CONSOLE_ERROR, err)
          reporter(info)
        }
      })
    })

    !coverError && consoleError.apply(window, args)
  }
}
