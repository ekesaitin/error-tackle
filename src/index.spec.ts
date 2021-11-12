import { TackleOptions } from 'src/typings/types'
import { createTackle, defaultOptions, getOptions } from './index'

describe('index', () => {
  const vueApp = {
    config: {
      errorHandler() {},
    },
  }

  test('getOptions', () => {
    const options = {
      url: 'xxxxx.com/xxx',
      method: 'POST',
      logError: false,
      jsError: false,
      promiseError: false,
      resourceError: false,
      consoleError: true,
      ajaxError: false,
      vueError: true,
      vueApp,
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

    const someOptions: TackleOptions = {
      url: 'xxxxx.com/xxx',
      method: 'POST',
      extendsData: 1010101010,
    }

    expect(getOptions()).toEqual(defaultOptions)
    expect(getOptions({})).toEqual(defaultOptions)
    expect(getOptions(options)).toEqual(options)
    expect(getOptions(someOptions)).toEqual({
      url: 'xxxxx.com/xxx',
      method: 'POST',
      extendsData: 1010101010,
      logError: true,
      jsError: true,
      promiseError: true,
      resourceError: true,
      consoleError: false,
      ajaxError: true,
      vueError: false,
      vueApp: null,
      coverError: true,
      onError: null,
    })
  })
})
