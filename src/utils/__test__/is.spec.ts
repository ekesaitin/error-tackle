import { isFunction, isObject, isPlainObject, isUrl, isVueApp } from '../is'

describe('utils-is', () => {
  test('isObject', () => {
    expect(isObject('')).toBe(false)
    expect(isObject(true)).toBe(false)
    expect(isObject(null)).toBe(false)
    expect(isObject([])).toBe(true)
    expect(isObject({})).toBe(true)
  })

  test('isPlainObject', () => {
    expect(isPlainObject(123)).toBe(false)
    expect(isPlainObject(null)).toBe(false)
    expect(isPlainObject([])).toBe(false)
    expect(isPlainObject({})).toBe(true)
  })

  test('isFunction', () => {
    expect(isFunction(true)).toBe(false)
    expect(isFunction({})).toBe(false)
    expect(isFunction([])).toBe(false)
    expect(isFunction(() => {})).toBe(true)
    expect(isFunction(function () {})).toBe(true)
  })

  test('isUrl', () => {
    expect(isUrl(123)).toBe(false)
    expect(isUrl({})).toBe(false)
    expect(isUrl('')).toBe(false)
    expect(isUrl('xxx')).toBe(false)
    expect(isUrl('https://localhost:3000')).toBe(true)
    expect(isUrl('http://localhost:3000')).toBe(true)
    expect(isUrl('//localhost:3000')).toBe(true)
  })

  test('isVueApp', () => {
    expect(isVueApp({})).toBe(false)
    expect(isVueApp([])).toBe(false)
    expect(isVueApp({ config: 111 })).toBe(false)
    expect(isVueApp({ config: [] })).toBe(false)
    expect(isVueApp({ config: {} })).toBe(true)
  })
})
