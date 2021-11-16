import { AnyObject } from 'src/typings/types'
import { isPlainObject, isString } from 'src/utils'

export const obj2query = (obj: AnyObject, startQuestionMark = true) =>
  isPlainObject(obj)
    ? Object.entries(obj).reduce(
        (q, [key, val], index) =>
          `${q}${index === 0 ? (startQuestionMark ? '?' : '') : '&'}${encodeURIComponent(
            key,
          )}=${encodeURIComponent(val)}`,
        '',
      )
    : obj

export const noop = () => {}

const stackRE = /at\s+(.*)\s+\((.*):(\d*):(\d*)\)/i

/** 从堆栈字符串获取详细信息 */
export const getSourceFromStack = (stack: string) => {
  if (!isString(stack) || !stackRE.test(stack)) return null
  const [f, name, source, lineno, colno] = stackRE.exec(stack) ?? []

  return {
    name,
    source,
    lineno: parseInt(lineno),
    colno: parseInt(colno),
  }
}
