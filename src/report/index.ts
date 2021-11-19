import { ErrorInfo, FETCH_URL_END, Method, Reporter, TackleOptions } from 'src/typings/types'
import { isUrl, obj2query } from 'src/utils'

export const fetchImg = (url: string, data: ErrorInfo) => {
  let query = obj2query(data)
  const gif = document.createElement('img')
  gif.src = url + query
}

export const fetchData = (url: string, method: Method, info: ErrorInfo) => {
  let query = obj2query(info)
  url = method === 'GET' ? url + query : url
  fetch(url + FETCH_URL_END, {
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
  (options: TackleOptions): Reporter =>
  (info: ErrorInfo) => {
    let { url, method, onError, logError, coverError, extendsData } = options

    let report = {
      ...info,
      ...(extendsData ? { extendsData } : false),
    }

    logError && coverError && console.log('error-tackle===', report.error)
    if (url && isUrl(url)) reportError(url, method, report)
    onError?.(info)
  }
