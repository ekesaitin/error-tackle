import { defaultOptions, Options } from 'src'
import { ErrorInfo } from 'src/error/parseErrorInfo'
import { isUrl, obj2query } from 'src/utils'

export type Reporter = (info: ErrorInfo) => void
type Method = Options['method']

const fetchImg = (url: string, data: ErrorInfo) => {
  let query = obj2query(data)
  const gif = document.createElement('img')
  gif.src = url + query
}

const fetchData = (url: string, method: Method, info: ErrorInfo) => {
  let query = obj2query(info)
  url = method === 'GET' ? url + query : url
  fetch(url, {
    method,
    headers: {
      'Content-Type': 'application/json',
    },
    ...(method === 'POST' && { body: JSON.stringify(info) }),
  })
}

export const reportError = (url: string, method: Method, info: ErrorInfo) => {
  if (method === 'IMG') fetchImg(url, info)
  else fetchData(url, method, info)
}

export const createReporter =
  (options: Options): Reporter =>
  (info: ErrorInfo) => {
    let { url, method, onError, logInfo, extendsData } = Object.assign({}, defaultOptions, options)
    let report = {
      ...info,
      ...(extendsData ? { extendsData } : false),
    }
    logInfo && console.log(report.error)
    if (url && isUrl(url)) reportError(url, method, report)
    onError?.(info)
  }
