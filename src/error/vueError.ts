import { ERROR_TYPE, TackleOptions } from 'src'
import { Reporter } from 'src/report'
import { getErrorInfo } from './parseErrorInfo'

export const tackleVueError = (options: TackleOptions, reporter: Reporter) => {
  const { vueApp } = options
  if (!vueApp) return

  vueApp.config.errorHandler = (err, vm, info) => {
    let errorInfo = getErrorInfo(ERROR_TYPE.VUE_ERROR, { err, vm, info })
    reporter(errorInfo)
  }
}
