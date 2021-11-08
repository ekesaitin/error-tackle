import { ERROR_TYPE } from 'src'
import { AJAX_ERROR_TYPE, getErrorInfo } from 'src/error/parseErrorInfo'
import { TackleOptions, Reporter } from 'src/typings/types'
import { noop } from 'src/utils'

const handleReportError = (reporter: Reporter, type: AJAX_ERROR_TYPE, error: any) => {
  const info = getErrorInfo(ERROR_TYPE.AJAX_ERROR, error, type)
  reporter(info)
}

const rewriteXmlHttpRequest = (reporter: Reporter) => {
  if (!window.XMLHttpRequest) {
    return
  }
  let xhrSend = XMLHttpRequest.prototype.send
  let _handleEvent = (e: any) => {
    try {
      if (e && e.currentTarget && e.currentTarget.status !== 200) {
        handleReportError(reporter, AJAX_ERROR_TYPE.XHR_ERROR, e)
      }
    } catch (err) {
      handleReportError(reporter, AJAX_ERROR_TYPE.XHR_ERROR, err)
    }
  }
  XMLHttpRequest.prototype.send = function () {
    if (this.addEventListener) {
      this.addEventListener('error', _handleEvent)
      this.addEventListener('load', _handleEvent)
      this.addEventListener('abort', _handleEvent)
    } else {
      let tempStateChange = this.onreadystatechange ?? noop
      this.onreadystatechange = function (event) {
        // @ts-ignore
        tempStateChange.apply(this, arguments)
        if (this.readyState === 4) {
          _handleEvent(event)
        }
      }
    }
    // @ts-ignore
    return xhrSend.apply(this, arguments)
  }
}

const rewriteFetch = (reporter: Reporter) => {
  if (!window.fetch) return

  let _oldFetch = window.fetch
  function newFetch(input: RequestInfo, init?: RequestInit | undefined) {
    return (
      _oldFetch
        // @ts-ignore
        .call(this, input, init)
        .then((res) => {
          if (!res.ok) {
            handleReportError(reporter, AJAX_ERROR_TYPE.FETCH_ERROR, res)
          }
          return res
        })
        .catch((err) => {
          handleReportError(reporter, AJAX_ERROR_TYPE.FETCH_ERROR, err)
        })
    )
  }

  window.fetch = newFetch as typeof window.fetch
}

export const tackleAjaxError = (options: TackleOptions, reporter: Reporter) => {
  rewriteXmlHttpRequest(reporter)
  rewriteFetch(reporter)
}
