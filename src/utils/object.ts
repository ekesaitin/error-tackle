import { isObject } from '.'

export const pick = <T extends Object, P extends keyof T>(obj: T, props: P[]): Pick<T, P> =>
  isObject(obj)
    ? props.reduce((acc, prop) => {
        if (obj[prop]) acc[prop] = obj[prop]
        return acc
      }, {} as Pick<T, P>)
    : obj
