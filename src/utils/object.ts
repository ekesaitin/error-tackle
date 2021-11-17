import { AnyObject } from 'src/typings/types'
import { isObject, isPlainObject, isString } from './is'

export const obj2query = (obj: AnyObject, startQuestionMark = true): any =>
  isPlainObject(obj)
    ? Object.entries(obj).reduce(
        (q, [key, val], index) =>
          `${q}${index === 0 ? (startQuestionMark ? '?' : '') : '&'}${encodeURIComponent(
            key,
          )}=${encodeURIComponent(isObject(val) ? JSON.stringify(val) : val)}`,
        '',
      )
    : obj

console.log(obj2query({ a: 11, b: { c: 22 }, d: [33, 44] }))
export const noop = () => {}

const stackRE = /at\s+(.*)\s+\((.*):(\d*):(\d*)\)/i
const stackRE1 = /at\s+(.+):(\d+):(\d+)/i

/** 从堆栈字符串获取详细信息 */
export const getSourceFromStack = (stack: string) => {
  if (!isString(stack)) return null
  let f, name, source, lineno, colno
  if (stackRE.test(stack)) {
    ;[f, name, source, lineno, colno] = stackRE.exec(stack) ?? []
  } else if (stackRE1.test(stack)) {
    ;[f, source, lineno, colno] = stackRE1.exec(stack) ?? []
  } else {
    return null
  }

  return {
    name,
    source,
    lineno: parseInt(lineno),
    colno: parseInt(colno),
  }
}
