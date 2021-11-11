import { createTackle, defaultOptions, getOptions } from './index'

describe('index', () => {
  const vueApp = {
    config: {
      errorHandler() {},
    },
  }

  test('getOptions', () => {
    const options = {
      url: '//localhost:3000/error',
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

    expect(getOptions()).toEqual(defaultOptions)
    expect(getOptions({})).toEqual(defaultOptions)
    expect(getOptions(options)).toEqual(options)
  })
})
