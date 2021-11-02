import { getDateTime } from '.'

export interface ErrorInfo {
  type: string
  message: string
  datatime: string
  extendsData?: any
}

const getErrorType = ({ error }: ErrorEvent) => {
  switch (error.constructor) {
    case EvalError:
      return 'EvalError'
    case RangeError:
      return 'RangeError'
    case ReferenceError:
      return 'ReferenceError'
    case SyntaxError:
      return 'SyntaxError'
    case TypeError:
      return 'TypeError'
    case URIError:
      return 'URIError'
    default:
      return 'Error'
  }
}

function formatErrorInfo(e: ErrorEvent, extendsData: any): ErrorInfo
function formatErrorInfo(e: ErrorEvent, extendsData: any) {
  console.log(`extendsData====`, extendsData)
  let info = {} as ErrorInfo
  let datatime = getDateTime()
  if (e instanceof ErrorEvent) {
    info = {
      type: getErrorType(e),
      message: e.message,
      datatime,
      extendsData,
    }
  }

  return info
}

export { formatErrorInfo }
