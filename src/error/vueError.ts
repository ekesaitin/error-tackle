import { ERROR_TYPE } from 'src'
import { Reporter } from 'src/report'
import { ErrorOptions } from '.'
import { getErrorInfo } from './parseErrorInfo'

export const tackleVueError = (options: ErrorOptions, reporter: Reporter) => {
  const { vueApp } = options
  if (!vueApp) return

  vueApp.config.errorHandler = (err, vm, info) => {
    let errorInfo = getErrorInfo(ERROR_TYPE.VUE_ERROR, { err, vm, info })
    reporter(errorInfo)
  }
}
