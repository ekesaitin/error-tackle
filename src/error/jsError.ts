import { Reporter } from 'src/report'
import { formatErrorInfo } from 'src/utils'
import { ErrorOptions } from '.'

export const tackleJsError = (
  { extendsData, coverError, logInfo }: ErrorOptions,
  reporter: Reporter,
) => {
  window.addEventListener('error', (e) => {
    coverError && e.preventDefault()
    let errorInfo = formatErrorInfo(e, extendsData)
    logInfo && console.log(errorInfo)
    reporter(errorInfo)
  })
}
