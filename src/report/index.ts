import { Options } from 'src'
import { ErrorInfo, isUrl, obj2query } from 'src/utils'

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
  ({ url, method = 'IMG', onError }: Options): Reporter =>
  (info: ErrorInfo) => {
    console.log(`isUrl(url)====`, isUrl(url))
    if (url && isUrl(url)) reportError(url, method, info)
    onError?.(info)
  }
