import { createReporter } from 'src/report'
import * as report from 'src/report'

describe('report', () => {
  const onError = jest.fn()

  window.fetch = jest.fn(() => Promise.resolve()) as any
  const fetchData = jest.spyOn(report, 'fetchData')
  const fetchImg = jest.spyOn(report, 'fetchImg')

  let errorInfo = {
    error: new Error('123'),
    message: '123 123',
    type: 'Error',
  }

  test('createReporter', () => {
    const reporter = createReporter({ onError })
    reporter(errorInfo)
    expect(onError).toBeCalledTimes(1)
    expect(onError.mock.calls[0][0]).toEqual(errorInfo)
  })

  test('url不存在', () => {
    const reportError = jest.spyOn(report, 'reportError')
    const reporter = createReporter({})
    reporter(errorInfo)
    expect(reportError).not.toBeCalled()
    expect(fetchData).not.toBeCalled()
    expect(fetchImg).not.toBeCalled()
  })

  test('IMG method', () => {
    const url = '//localhost:3000/gif.gif'
    const reporter = createReporter({ url, method: 'IMG' })
    reporter(errorInfo)
    expect(fetchData).not.toBeCalled()
    expect(fetchImg).toBeCalledTimes(1)
    expect(fetchImg.mock.calls[0][0]).toBe(url)
    expect(fetchImg.mock.calls[0][1]).toEqual(errorInfo)
  })

  test('GET method', () => {
    const url = '//localhost:3000/errorPath'
    const reporter = createReporter({ url, method: 'GET' })
    reporter(errorInfo)
    expect(fetchImg).not.toBeCalledTimes(1)
    expect(fetchData).toBeCalled()
    expect(fetchData.mock.calls[0][0]).toBe(url)
    expect(fetchData.mock.calls[0][1]).toBe('GET')
    expect(fetchData.mock.calls[0][2]).toEqual(errorInfo)
  })

  test('POST method', () => {
    const url = '//localhost:3000/errorPath'
    const reporter = createReporter({ url, method: 'POST' })
    reporter(errorInfo)
    expect(fetchImg).not.toBeCalledTimes(1)
    expect(fetchData).toBeCalled()
    expect(fetchData.mock.calls[0][0]).toBe(url)
    expect(fetchData.mock.calls[0][1]).toBe('POST')
    expect(fetchData.mock.calls[0][2]).toEqual(errorInfo)
  })
})
