import { AnyObject } from 'src/typings/types'
import { isObject } from './is'

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

export const noop = () => {}
