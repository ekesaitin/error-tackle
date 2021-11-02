import { isObject } from '.'

export const pick = <T extends Object, P extends keyof T>(obj: T, props: P[]): Pick<T, P> =>
  isObject(obj)
    ? props.reduce((acc, prop) => {
        if (obj[prop]) acc[prop] = obj[prop]
        return acc
      }, {} as Pick<T, P>)
    : obj

export const obj2query = (obj: AnyObject, startQuestionMark = true) =>
  isObject(obj)
    ? Object.entries(obj).reduce(
        (q, [key, val], index) =>
          `${q}${index === 0 ? (startQuestionMark ? '?' : '') : '&'}${encodeURIComponent(
            key,
          )}=${encodeURIComponent(val)}`,
        '',
      )
    : obj
