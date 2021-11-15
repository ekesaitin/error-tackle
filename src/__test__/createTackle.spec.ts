import { TackleOptions } from '../typings/types'
import { createTackle, defaultOptions } from '../index'
import * as error from '../error'
import * as report from '../report'

jest.mock('../error')
jest.mock('../report')

describe('createTackle', () => {
  const createErrorTackle: any = error.createErrorTackle
  const createReporter: any = report.createReporter

  test('没有options传入时', () => {
    createTackle()
    expect(createErrorTackle).toHaveBeenCalledTimes(1)
    expect(createErrorTackle.mock.calls[0][0]).toEqual(defaultOptions)
    expect(createReporter).toHaveBeenCalledTimes(1)
    expect(createReporter.mock.calls[0][0]).toEqual(defaultOptions)
  })

  test('options为非对象时', () => {
    let opts: any = 1
    createTackle(opts)
    opts = []
    createTackle(opts)
    opts = Symbol()
    createTackle(opts)
    expect(createErrorTackle).toBeCalledTimes(3)
    createErrorTackle.mock.calls.forEach((call: any[]) => {
      expect(call[0]).toEqual(defaultOptions)
    })
    expect(createReporter).toBeCalledTimes(3)
    createReporter.mock.calls.forEach((call: any[]) => {
      expect(call[0]).toEqual(defaultOptions)
    })
  })

  test('options为一个对象时', () => {
    const wholeOptions: TackleOptions = {
      url: 'xxxxx.com/xxx',
      method: 'POST',
      logError: false,
      jsError: false,
      promiseError: false,
      resourceError: false,
      consoleError: true,
      ajaxError: false,
      vueError: true,
      vueApp: {
        config: {
          errorHandler() {},
        },
      },
      coverError: false,
      extendsData: {
        token: 'xxx-xxxx-xx',
        user: {
          name: 'username',
          auth: 'userauth',
        },
      },
      onError: () => {},
    }

    const partialOptions: TackleOptions = {
      url: 'xxxxx.com/xxx',
      method: 'POST',
      extendsData: 1010101010,
    }

    createTackle({})
    createTackle(wholeOptions)
    createTackle(partialOptions)
    expect(createErrorTackle).toBeCalledTimes(3)
    expect(createErrorTackle.mock.calls[0][0]).toEqual(defaultOptions)
    expect(createErrorTackle.mock.calls[1][0]).toEqual(wholeOptions)
    expect(createErrorTackle.mock.calls[2][0]).toMatchSnapshot()
    expect(createReporter).toBeCalledTimes(3)
    expect(createReporter.mock.calls[0][0]).toEqual(defaultOptions)
    expect(createReporter.mock.calls[1][0]).toEqual(wholeOptions)
    expect(createReporter.mock.calls[2][0]).toMatchSnapshot()
  })
})
