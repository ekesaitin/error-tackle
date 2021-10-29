export interface ErrorOptions {
  jsError?: boolean
  promiseError?: boolean
  resourceError?: boolean
  vueError?: boolean
  vueApp?: {
    config: {
      errorHandler?: (err: unknown, instance: AnyObject | null, info: string) => void
    } & AnyObject
  } & AnyObject
}

export const createErrorTackle = (options: ErrorOptions) => {
  console.log('options====', options)
}
