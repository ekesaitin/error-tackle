export const isObject = (val: unknown): val is AnyObject => val !== null && typeof val === 'object'
