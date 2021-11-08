import { AnyObject, VueApp } from 'src/typings/types'

export const isObject = (val: unknown): val is AnyObject => val !== null && typeof val === 'object'

export const isString = (val: unknown): val is string => typeof val === 'string'

export const isFunction = (val: unknown): val is Function => typeof val === 'function'

export const isEventListenerObject = (val: unknown): val is EventListenerObject =>
  isObject(val) && isFunction(val.handleEvent)

export const isUrl = (val: unknown) =>
  isString(val) && (val.startsWith('http') || val.startsWith('//'))

export const isVueApp = (val: unknown): val is VueApp => isObject(val) && isObject(val.config)
