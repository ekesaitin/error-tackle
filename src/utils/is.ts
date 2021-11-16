import { AnyObject, VueApp } from 'src/typings/types'

export const isObject = (val: unknown): val is AnyObject => val !== null && typeof val === 'object'

export const objectToString = Object.prototype.toString

export const toTypeString = (value: unknown): string => objectToString.call(value)

export const isPlainObject = (val: unknown): val is object =>
  toTypeString(val) === '[object Object]'

export const isArray = Array.isArray

export const isString = (val: unknown): val is string => typeof val === 'string'

export const isFunction = (val: unknown): val is Function => typeof val === 'function'

const urlRE = /^(https?:)?\/\//
export const isUrl = (val: unknown) => isString(val) && urlRE.test(val)

export const isVueApp = (val: unknown): val is VueApp => isObject(val) && isPlainObject(val.config)
