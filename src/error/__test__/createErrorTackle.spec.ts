import { createErrorTackle } from 'src/error'
import { AnyObject } from 'src/typings/types'
import { tackleAjaxError } from '../ajaxError'
import { tackleConsoleError } from '../consoleError'
import { tackleJsError } from '../jsError'
import { tacklePromiseError } from '../promiseError'
import { tackleResourceError } from '../resourceError'
import { tackleVueError } from '../vueError'

jest.mock('../ajaxError')
jest.mock('../consoleError')
jest.mock('../jsError')
jest.mock('../promiseError')
jest.mock('../resourceError')
jest.mock('../vueError')

const reporter = jest.fn()

describe('createErrorTackle', () => {
  test('所有选项都为真', () => {
    createErrorTackle(
      {
        jsError: true,
        promiseError: true,
        resourceError: true,
        consoleError: true,
        ajaxError: true,
        vueApp: {
          config: {},
        },
        vueError: true,
      },
      reporter,
    )

    expect(tackleAjaxError).toBeCalledTimes(1)
    expect(tackleConsoleError).toBeCalledTimes(1)
    expect(tackleJsError).toBeCalledTimes(1)
    expect(tacklePromiseError).toBeCalledTimes(1)
    expect(tackleResourceError).toBeCalledTimes(1)
    expect(tackleVueError).toBeCalledTimes(1)
  })

  test('所有选项都为假', () => {
    createErrorTackle(
      {
        jsError: false,
        promiseError: false,
        resourceError: false,
        consoleError: false,
        ajaxError: false,
        vueApp: {
          config: {},
        },
        vueError: false,
      },
      reporter,
    )

    expect(tackleAjaxError).not.toBeCalled()
    expect(tackleConsoleError).not.toBeCalled()
    expect(tackleJsError).not.toBeCalled()
    expect(tacklePromiseError).not.toBeCalled()
    expect(tackleResourceError).not.toBeCalled()
    expect(tackleVueError).not.toBeCalled()
  })

  test('vueApp不存在或不是一个vue对象时', () => {
    const options: AnyObject = {
      vueError: true,
    }
    createErrorTackle(options, reporter)
    options.vueApp = { config: [] }
    createErrorTackle(options, reporter)
    options.vueApp = {}
    createErrorTackle(options, reporter)
    options.vueApp = []
    createErrorTackle(options, reporter)
    expect(tackleVueError).not.toBeCalled()
  })
})
