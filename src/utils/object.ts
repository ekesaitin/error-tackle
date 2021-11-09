import { AnyObject } from 'src/typings/types'
import { isObject } from './is'

/** 字符串转url参数 */
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

/** 这是一个空函数 */
export const noop = () => {}
