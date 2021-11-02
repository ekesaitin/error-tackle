export const isObject = (val: unknown): val is AnyObject => val !== null && typeof val === 'object'
export const isString = (val: unknown): val is string => typeof val === 'string'
export const isUrl = (val: unknown) =>
  isString(val) && (val.startsWith('http') || val.startsWith('//'))
