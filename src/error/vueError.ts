import { Reporter, TackleOptions } from 'src/typings/types'

export const tackleVueError = (options: TackleOptions, reporter: Reporter) => {
  const { vueApp } = options
  if (!vueApp) return

  vueApp.config.errorHandler = (err, vm, info) => {
    setTimeout(() => {
      throw err
    })
  }
}
