import { TackleOptions } from 'src'
import { Reporter } from 'src/report'

export const tackleVueError = (options: TackleOptions, reporter: Reporter) => {
  const { vueApp } = options
  if (!vueApp) return

  vueApp.config.errorHandler = (err, vm, info) => {
    setTimeout(() => {
      throw err
    })
  }
}
