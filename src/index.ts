import { createErrorTackle, ErrorOptions } from './error'
import { pick } from './utils'

type TackleOptions = ErrorOptions

const defaultErrorOptions: ErrorOptions = {
  jsError: true,
  promiseError: true,
  resourceError: true,
  vueError: false,
}

const getOptions = (options: TackleOptions, defaultOpts: ErrorOptions) => {
  const keys = Object.keys(defaultOpts) as any as (keyof ErrorOptions)[]
  const opts = pick(options ?? {}, keys)

  return { ...defaultErrorOptions, ...opts }
}

export const createTackle = (options: TackleOptions) => {
  createErrorTackle(getOptions(options, defaultErrorOptions))
}
