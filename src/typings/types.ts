export type AnyObject = Record<string | number | symbol, any>

export interface TackleOptions {
  /** 上报信息的接口地址 */
  url?: string
  /** 上报信息的请求方式 */
  method?: 'GET' | 'POST' | 'IMG'
  /** 是否在控制台打印错误 */
  logError?: boolean
  /** 上报信息需要额外携带的数据 */
  extendsData?: any
  /** 捕获到错误时会执行的方法 */
  onError?: (info: ErrorInfo) => void
  /** 是否监听js错误（TypeError、ReferenceError等） */
  jsError?: boolean
  /** 是否监听promise错误 */
  promiseError?: boolean
  /** 是否监听资源错误 */
  resourceError?: boolean
  /** 是否监听console.error错误 */
  consoleError?: boolean
  /** 是否监听ajax错误 （xmlHttpRequest、fetch） */
  ajaxError?: boolean
  /** 是否监听vue错误 */
  vueError?: boolean
  /** vue应用实例 */
  vueApp?: VueApp | null
  /** 是否阻止错误继续向上传播 */
  coverError?: boolean
}

export type VueErrorHandler = (err: any, vm: AnyObject, info: string) => void

export interface VueApp {
  config: {
    errorHandler: VueErrorHandler
  }
}

export interface VueErrorEvent {
  err: any
  vm: AnyObject
  info: string
}

export interface ErrorInfo {
  type: string
  error: any
  message: string
  source?: string
  lineno?: number
  colno?: number
  datatime?: string
  extendsData?: any
  userAgent?: UserAgentObj
}

export type Reporter = (info: ErrorInfo) => void

export type Method = TackleOptions['method']

export interface BrowserReg {
  [Chrome: string]: RegExp
  IE: RegExp
  Firefox: RegExp
  Opera: RegExp
  Safari: RegExp
  '360': RegExp
  QQBrowswe: RegExp
}

export interface DeviceReg {
  [iPhone: string]: RegExp
  Android: RegExp
  iPad: RegExp
  Windows: RegExp
  Mac: RegExp
}

/** 用户设备信息 */
export interface UserAgentObj {
  /** 浏览器名称 */
  browserName: string
  /** 浏览器版本 */
  browserVersion: string
  /** 操作系统名称 */
  osName: string
  /** 操作系统版本 */
  osVersion: string
  /** 设备名称 */
  deviceName: string
}
